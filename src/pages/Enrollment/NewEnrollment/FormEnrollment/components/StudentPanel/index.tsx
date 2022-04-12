import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import * as Yup from 'yup';
import { validateCep, validateCPF } from 'validations-br';
import { Button } from '../../../../../../components/Forms/Buttons/Button';
import { DateInputLine } from '../../../../../../components/Forms/DateInputLine';
import { FormSection } from '../../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../../components/Forms/InputLine';
import { InputSection } from '../../../../../../components/Forms/InputSection';
import SelectLine from '../../../../../../components/Forms/SelectLine';
import ContentPanel from '../../../../../../components/Panels/ContentPanel';
import {
  cultureOptions,
  conductOptions,
  disabilityOptions,
  genderOptions,
  maritalStatusOptions,
  occupationOptions,
  raceOptions,
  schoolTypeOptions,
  schoolingOptions,
} from '../../data/options';
import { Container, FormContent } from './styles';
import getValidationErros from '../../../../../../utils/getValidationErrors';
import api from '../../../../../../services/api';
import { IStudent } from '../../data/types';
import { useModal } from '../../../../../../hooks/modal';
import {
  cellPhoneMasked, cepMasked, cpfMasked, removeMask,
} from '../../../../../../utils/masks';
import { studentValidationScheme } from '../../data/validation';

interface StudentPanelProps {
  student: IStudent | undefined;
  getStudent: (cpf: string) => void;
  nextStage: (value: number) => void;
}

// 321.548.330-04
const StudentPanel: React.FC<StudentPanelProps> = ({ student, getStudent, nextStage }) => {
  const formRef = useRef<FormHandles>(null);
  const { configModal, handleVisible } = useModal();
  const [localStudent, setLocalStudent] = useState<IStudent>();
  const [zipCode, setZipCode] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [birthDate, setBirthDate] = useState<Date>();

  const [loading, setLoading] = useState(false);
  const [loadingSearchStudent, setLoadingSearchStudent] = useState(false);
  const [loadingGetAddress, setLoadingGetAddress] = useState(false);

  const [selectedCulture, setSelectedCulture] = useState<string>();
  const [selectedConduct, setSelectedConduct] = useState<string>();
  const [selectedDisability, setSelectedDisability] = useState<string>();
  const [selectedGender, setSelectedGender] = useState<string>();
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string>();
  const [selectedOccupation, setSelectedOccupation] = useState<string>();
  const [selectedRace, setSelectedRace] = useState<string>();
  const [selectedSchoolType, setSelectedSchoolType] = useState<string>();
  const [selectedSchooling, setSelectedSchooling] = useState<string>();

  const studentSetup = useCallback((studentData: IStudent) => {
    const temp: IStudent = {
      ...studentData,
      birth_date: new Date(studentData.birth_date),
      cpf: cpfMasked(studentData.cpf || ' '),
      cellphone: cellPhoneMasked(studentData.cellphone || ' '),
      whatsapp: cellPhoneMasked(studentData.whatsapp || ' '),
      cep: cepMasked(studentData.cep || ' '),
    };

    setBirthDate(temp.birth_date as Date);
    setCpf(temp.cpf);
    setZipCode(temp.cep);

    setSelectedCulture(temp.culture);
    setSelectedConduct(temp.conduct);
    setSelectedDisability(temp.disability);
    setSelectedGender(temp.gender);
    setSelectedMaritalStatus(temp.marital_status);
    setSelectedOccupation(temp.occupation);
    setSelectedRace(temp.race);
    setSelectedSchoolType(temp.school_type);
    setSelectedSchooling(temp.schooling);

    setLocalStudent(temp);
  }, []);

  const getAddress = useCallback(async (data) => {
    setLoadingGetAddress(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        zipcode: Yup.string()
          .required('CEP obrigatório')
          .test(
            'is-cpf',
            'CEP inválido',
            (value) => validateCep(value as string),
          ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.get(`/school/dashboard/cep/${zipCode}`).then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          formRef.current?.setData({
            street: response.data.logradouro,
            estate: response.data.uf,
            city: response.data.localidade,
            neighborhood: response.data.bairro,
          });
        }
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoadingGetAddress(false);
    }
  }, [zipCode]);

  const searchStudent = useCallback(async (data) => {
    setLoadingSearchStudent(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string()
          .test(
            'is-cpf',
            'CPF inválido',
            (value) => validateCPF(value as string),
          )
          .required('CPF obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.get(`/student/dashboard/search/${removeMask(cpf as string)}`).catch((err) => {
        configModal(err.response.data.message, 'error');
        handleVisible();
      }).then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          configModal(
            `O CPF digitado pertence à ${response.data.name} , deseja carrega suas informações?`,
            'message',
            true,
            () => { studentSetup(response.data); },
          );
          handleVisible();
        }
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoadingSearchStudent(false);
    }
  }, [configModal, cpf, handleVisible, studentSetup]);

  const createStudent = useCallback(async (data: IStudent) => {
    await api.post('/student/dashboard', {
      ...data,
      culture: selectedCulture,
      conduct: selectedConduct,
      disability: selectedDisability,
      gender: selectedGender,
      marital_status: selectedMaritalStatus,
      occupation: selectedOccupation,
      race: selectedRace,
      school_type: selectedSchoolType,
      schooling: selectedSchooling,
      cep: zipCode && removeMask(zipCode),
      cellphone: removeMask(data.cellphone),
      whatsapp: removeMask(data.whatsapp),
      cpf: cpf && removeMask(cpf),
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O aluno foi cadastrado com sucesso, agora é possível realizar sua matrícula', 'success');
        handleVisible();
        getStudent(cpf as string);
        nextStage(1);
      }
    });
  }, [
    getStudent,
    nextStage,
    configModal,
    handleVisible,
    selectedConduct,
    selectedCulture,
    selectedDisability,
    selectedGender,
    selectedMaritalStatus,
    selectedOccupation,
    selectedRace,
    selectedSchoolType,
    selectedSchooling,
    cpf, zipCode]);

  const updateStudent = useCallback(async (data: IStudent) => {
    await api.put(`/student/dashboard/${localStudent?.id}`, {
      ...data,
      culture: selectedCulture,
      conduct: selectedConduct,
      disability: selectedDisability,
      gender: selectedGender,
      marital_status: selectedMaritalStatus,
      occupation: selectedOccupation,
      race: selectedRace,
      school_type: selectedSchoolType,
      schooling: selectedSchooling,
      cep: zipCode && removeMask(zipCode),
      cellphone: removeMask(data.cellphone),
      whatsapp: removeMask(data.whatsapp),
      cpf: cpf && removeMask(cpf),
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Atualizado com sucesso', 'success');
        handleVisible();
        getStudent(cpf as string);
      }
    });
  }, [
    localStudent?.id,
    selectedCulture,
    selectedConduct,
    selectedDisability,
    selectedGender,
    selectedMaritalStatus,
    selectedOccupation,
    selectedRace,
    selectedSchoolType,
    selectedSchooling,
    zipCode,
    cpf,
    configModal,
    handleVisible,
    getStudent]);

  const handleSubmit = useCallback(async (data: IStudent) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = studentValidationScheme(
        selectedConduct,
        selectedCulture,
        selectedDisability,
        selectedGender,
        selectedMaritalStatus,
        selectedOccupation,
        selectedRace,
        selectedSchoolType,
        selectedSchooling,
      );

      await schema.validate(data, {
        abortEarly: false,
      });

      if (localStudent) await updateStudent(data);
      else await createStudent(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [
    createStudent,
    localStudent,
    selectedConduct,
    selectedCulture,
    selectedDisability,
    selectedGender,
    selectedMaritalStatus,
    selectedOccupation,
    selectedRace,
    selectedSchoolType,
    selectedSchooling,
    updateStudent]);

  useEffect(() => {
    if (student) studentSetup(student);
  }, [student, studentSetup]);

  return (
    <Container>
      <ContentPanel
        title="Informações Pessoais"
        subTitle="Dados documentais do aluno"
        footerContent={(
          <Button
            loading={loading}
            maxWidth="150px"
            minHeight="44px"
            onClick={() => formRef.current?.submitForm()}
          >
            salvar
          </Button>
        )}
        gridColumn="2 / 5"
        width="50%"
      >
        <FormContent
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={localStudent}
        >
          <FormSection gridColumn="1 / 2">
            <InputSection grid_template_column="1fr auto">
              <InputLine
                mask="cpf"
                name="cpf"
                label="CPF"
                gridRow="4 / 4"
                value={cpf}
                setValue={setCpf}
              />

              <Button
                loading={loadingSearchStudent}
                styleType="outline"
                gridColumn="2 / 3"
                gridRow="4 / 4"
                width="58px"
                maxHeight="34px"
                iconWithMargin={false}
                onClick={() => searchStudent(formRef.current?.getData())}
              >
                <MdOutlineSearch size={24} />
              </Button>
            </InputSection>

            <InputLine
              name="name"
              label="Nome"
            />

            <InputSection grid_template_column="1fr 1fr">

              <DateInputLine
                name="birth_date"
                label="Data de Nascimento"
                newValue={birthDate}
              />

              <SelectLine
                name="gender"
                label="Sexo"
                options={genderOptions}
                value={genderOptions.filter(({ value }) => value === selectedGender)}
                onChange={(event: any) => setSelectedGender(event.value)}
              />

              <SelectLine
                name="race"
                label="Raça"
                options={raceOptions}
                value={raceOptions.filter(({ value }) => value === selectedRace)}
                onChange={(event: any) => setSelectedRace(event.value)}
              />

              <SelectLine
                name="marital_status"
                label="Estado Civil"
                options={maritalStatusOptions}
                value={maritalStatusOptions.filter(({ value }) => value === selectedMaritalStatus)}
                onChange={(event: any) => setSelectedMaritalStatus(event.value)}
              />

              <SelectLine
                name="schooling"
                label="Escolaridade"
                gridColumn="1 / 3"
                options={schoolingOptions}
                value={schoolingOptions.filter(({ value }) => value === selectedSchooling)}
                onChange={(event: any) => setSelectedSchooling(event.value)}
              />

              <SelectLine
                name="culture"
                label="Cultura"
                options={cultureOptions}
                value={cultureOptions.filter(({ value }) => value === selectedCulture)}
                onChange={(event: any) => setSelectedCulture(event.value)}
              />

              <InputSection grid_template_column="1fr auto">
                <InputLine
                  mask="cep"
                  name="zipcode"
                  label="CEP"
                  value={zipCode}
                  setValue={setZipCode}
                />

                <Button
                  loading={loadingGetAddress}
                  styleType="outline"
                  gridColumn="2 / 3"
                  width="58px"
                  maxHeight="34px"
                  iconWithMargin={false}
                  onClick={() => getAddress(formRef.current?.getData())}
                >
                  <MdOutlineSearch size={24} />
                </Button>
              </InputSection>

              <InputLine
                mask="cell-phone"
                name="cellphone"
                label="Telefone"
              />
              <InputLine
                mask="cell-phone"
                name="whatsapp"
                label="Whatsapp"
              />
            </InputSection>

            <InputLine
              name="street"
              label="Rua"
            />

            <InputLine
              name="address_complement"
              label="Complemento"
            />

          </FormSection>
          <FormSection gridColumn="2 / 3">

            <InputLine
              name="legal_responsible"
              label="Nome do Responsável"
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="naturalness"
                label="Naturalidade"
              />

              <SelectLine
                name="disability"
                label="Deficiência"
                options={disabilityOptions}
                value={disabilityOptions.filter(({ value }) => value === selectedDisability)}
                onChange={(event: any) => setSelectedDisability(event.value)}
              />

              <SelectLine
                name="conduct"
                label="Conduta"
                gridColumn="1 / 3"
                options={conductOptions}
                value={conductOptions.filter(({ value }) => value === selectedConduct)}
                onChange={(event: any) => setSelectedConduct(event.value)}
              />

              <SelectLine
                name="school_type"
                label="Escola"
                options={schoolTypeOptions}
                value={schoolTypeOptions.filter(({ value }) => value === selectedSchoolType)}
                onChange={(event: any) => setSelectedSchoolType(event.value)}
              />

              <SelectLine
                name="occupation"
                label="Ocupação"
                options={occupationOptions}
                value={occupationOptions.filter(({ value }) => value === selectedOccupation)}
                onChange={(event: any) => setSelectedOccupation(event.value)}
              />

              <InputLine
                name="rg"
                label="RG"
              />
              <InputLine
                name="issuing_document"
                label="Orgão Emissor"
              />

              <InputLine
                name="email"
                label="Email"
                gridColumn="1 / 3"
              />

              <InputLine
                name="city"
                label="Cidade"
              />
              <InputLine
                name="estate"
                label="Estado"
              />
              <InputLine
                name="number"
                label="Número"
              />
              <InputLine
                name="neighborhood"
                label="Bairro"
              />
            </InputSection>
          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default StudentPanel;
