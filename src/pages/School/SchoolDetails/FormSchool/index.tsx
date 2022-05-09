import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateCep, validatePhone } from 'validations-br';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import TextAreaLine from '../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import { ISchool } from '../../../../interfaces/ISchool';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';
import { cepMasked, removeMask, telMasked } from '../../../../utils/masks';

import {
  Container, FormContent,
} from './styles';

const FormSchool: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { configModal, handleVisible } = useModal();
  const [zipCode, setZipCode] = useState<string>();

  const [currentSchool, setCurrentSchool] = useState<ISchool | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [loadingGetAddress, setLoadingGetAddress] = useState(false);

  const location: any = useLocation();

  const configSchool = useCallback((data: ISchool) => {
    const temp = {
      ...data,
      zipcode: cepMasked(data.zipcode),
      phone: telMasked(data.phone),
      whatsapp_number: data.whatsapp_number && telMasked(data.whatsapp_number),
    };

    setZipCode(temp.zipcode);
    setCurrentSchool(temp);
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

  const createSchool = useCallback(async (data: ISchool) => {
    await api.post('/school/dashboard', {
      ...data,
      zipcode: removeMask(data.zipcode),
      phone: removeMask(data.phone),
      whatsapp_number: data.whatsapp_number && removeMask(data.whatsapp_number),
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Escola criada com sucesso', 'success');
        handleVisible();
        navigate(-1);
      }
    });
  }, [configModal, handleVisible, navigate]);

  const updateSchool = useCallback(async (data: ISchool) => {
    await api.put(`/school/dashboard/${currentSchool?.id}`, {
      ...data,
      zipcode: removeMask(data.zipcode),
      phone: removeMask(data.phone),
      whatsapp_number: data.whatsapp_number && removeMask(data.whatsapp_number),

    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Escola atualizada com sucesso', 'success');
        handleVisible();
        navigate(-1);
      }
    });
  }, [configModal, currentSchool?.object_id, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        initials: Yup.string()
          .required('Sigla obrigatória'),
        email: Yup.string().email('Email inválido')
          .required('Email obrigatório'),
        phone: Yup.string()
          .test('is-valid', 'Número inválido', (value) => validatePhone(value as string))
          .required('Telefone obrigatório'),
        whatsapp_number: Yup.string()
          .test('is-valid', 'Número inválido', (value) => (value ? validatePhone(value as string) : true)),
        zipcode: Yup.string()
          .required('CEP obrigatório'),
        city: Yup.string()
          .required('Cidade obrigatória'),
        estate: Yup.string()
          .required('Estado obrigatório'),
        street: Yup.string()
          .required('Rua obrigatória'),
        number: Yup.number()
          .typeError('Número obrigatório')
          .test('has-number', 'Número obrigatório', (value) => value as number >= 0),
        neighborhood: Yup.string()
          .required('Bairro obrigatório'),
        free_enrollment_goal: Yup.number()
          .typeError('Meta obrigatória')
          .test('has-meta', 'Meta obrigatória', (value) => (currentSchool ? value as number >= 0 : true)),
        payed_enrollment_goal: Yup.number()
          .typeError('Meta obrigatória')
          .test('has-meta', 'Meta obrigatória', (value) => (currentSchool ? value as number >= 0 : true)),
        business_hours: Yup.string()
          .required('Horário obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (currentSchool) await updateSchool(data);
      else await createSchool(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [createSchool, currentSchool, updateSchool]);

  const getCurrentSchool = useCallback(async () => {
    await api.get(`/school/dashboard/specific/${location.state?.school.object_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        const schoolResponse: ISchool = response.data;

        configSchool(schoolResponse);
      } else {
        setCurrentSchool(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.school, configSchool]);

  useEffect(() => {
    if (location.state?.school) {
      getCurrentSchool();
    } else setCurrentSchool(undefined);

    formRef.current?.setErrors({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ContentPanel
        title="Informações da Unidade"
        subTitle="Estas informações serão exibidas no aplicativo para o usuário"
        footerContent={(
          <Button
            maxWidth="150px"
            minHeight="44px"
            loading={loading}
            onClick={() => formRef.current?.submitForm()}
          >
            salvar
          </Button>
)}
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={currentSchool}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="name"
              label="Nome"
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                textTransform="uppercase"
                name="initials"
                label="Sigla"
              />
              <InputLine
                name="email"
                label="Email"
                gridRow="2 / 2"
                gridColumn="1 / 3"
              />
              <InputLine
                mask="cell-phone"
                name="phone"
                label="Telefone"
                gridRow="3 / 3"
              />
              <InputLine
                mask="cell-phone"
                name="whatsapp_number"
                label="Whatsapp"
                gridRow="3 / 3"
              />

              <InputLine
                mask="cep"
                name="zipcode"
                label="CEP"
                value={zipCode}
                setValue={setZipCode}
                gridRow="4 / 4"
              />

              <Button
                styleType="outline"
                gridColumn="2 / 3"
                gridRow="4 / 4"
                width="58px"
                maxHeight="34px"
                iconWithMargin={false}
                loading={loadingGetAddress}
                onClick={() => getAddress(formRef.current?.getData())}
              >
                <MdOutlineSearch size={24} />
              </Button>
            </InputSection>

            <InputLine
              name="street"
              label="Endereço"
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="neighborhood"
                label="Bairro"
              />

              <InputLine
                mask="numeric"
                name="number"
                label="Número"
              />

              <InputLine
                name="city"
                label="Cidade"
              />

              <InputLine
                maxLength={2}
                textTransform="uppercase"
                name="estate"
                label="Estado (UF)"
              />
            </InputSection>

          </FormSection>
          <FormSection gridColumn="2 / 3">
            {currentSchool
            && (
            <InputSection grid_template_column="1fr 1fr">

              <InputLine
                mask="numeric"
                name="free_enrollment_goal"
                label="Meta de vagas gratuitas"
              />

              <InputLine
                mask="numeric"
                name="payed_enrollment_goal"
                label="Meta de vagas pagas"
              />
            </InputSection>
            )}
            <TextAreaLine
              name="business_hours"
              label="Horário de Atendimento"
              rows={6}
            />

          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormSchool;
