import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { MdSwapHoriz } from 'react-icons/md';
import * as Yup from 'yup';
import { Button } from '../../../../../../components/Forms/Buttons/Button';
import { DateInputLine } from '../../../../../../components/Forms/DateInputLine';
import { FormSection } from '../../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../../components/Forms/InputLine';
import { InputSection } from '../../../../../../components/Forms/InputSection';
import SelectLine from '../../../../../../components/Forms/SelectLine';
import ContentPanel from '../../../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../../../hooks/modal';
import api from '../../../../../../services/api';
import getValidationErros from '../../../../../../utils/getValidationErrors';
import { removeMask } from '../../../../../../utils/masks';
import { IClassroom } from '../../../../../Classroom/data/types';
import { enrollmentTypeOptions } from '../../data/options';
import { IEnrollment, IStudent } from '../../data/types';
import { paymentOptions, sgeOptions } from '../../../../../Classroom/data/options';

import { Container, FormContent } from './styles';
import { currencyFormatted } from '../../../../../../utils/currencyUtilities';
import { useEnrollment } from '../../../../../../hooks/enrollment';

interface EnrollmentsPanelProps {
  handleCancel: Function;
  enrollment?:IEnrollment;
  student:IStudent;
  setEnrollment: (newValue: IEnrollment) => void;
  nextStage: (value: number) => void;
}

interface OptionsResponse {
  id: string;
  name?:string;
  code?: string;
  shift?: string[];
}

const EnrollmentsPanel: React.FC<EnrollmentsPanelProps> = ({
  handleCancel,
  enrollment,
  student,
  setEnrollment,
  nextStage,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { configModal, handleVisible } = useModal();
  const { isEditing } = useEnrollment();
  const [localEnrollment, setLocalEnrollment] = useState<IEnrollment>();
  const [currentClassroom, setCurrentClassroom] = useState<IClassroom>();
  const [responseCourseData, setResponseCourseData] = useState<OptionsResponse[]>([]);
  const [responseClassroomData, setResponseClassroomData] = useState<OptionsResponse[]>([]);

  const coursesList = useMemo(() => responseCourseData.map(({ id, name }) => ({
    value: id,
    label: name,
  })), [responseCourseData]);

  const classroomList = useMemo(() => responseClassroomData.map(({ id, code, shift }) => ({
    value: id,
    label: `${shift?.reduce((prev, curr) => `${prev} e ${curr}`)} - ${code}`,
  })), [responseClassroomData]);

  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [selectedClassroom, setSelectedClassroom] = useState<string>();
  const [selectedPartner, setSelectedPartner] = useState<string>();
  const [selectedPayment, setSelectedPayment] = useState<string>();
  const [selectedSgeSituation, setSelectedSgeSituation] = useState<string>();
  const [selectedEnrollmentType, setSelectedEnrollmentType] = useState<string>();

  const partnerOptions = useMemo(() => [{ value: 'Nenhum', label: 'Nenhum' }], []);

  const getCurrentClassroom = useCallback(async (classroom_id) => {
    await api.get(`/classroom/dashboard/specific/${classroom_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentClassroom(response.data);
        setSelectedClassroom(classroom_id);
        setLocalEnrollment({
          classroom_begin_date: `${response.data.classroom.month}/${response.data.year}`,
          classroom_shift_formatted: response.data.classroom.shift.reduce((prev: any, curr: any) => `${prev} e ${curr}`),
          course_cost: currencyFormatted(response.data.classroom.course.cost),
        } as IEnrollment);
      }
    });
  }, [configModal, handleVisible]);

  const getClassroomList = useCallback(async (course_id) => {
    await api.get(`/classroom/dashboard/list/${course_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setResponseClassroomData(response.data);
        if (enrollment) {
          setSelectedClassroom(enrollment.classroom_id);
          getCurrentClassroom(enrollment.classroom_id);
        }
      }
    });
  }, [configModal, handleVisible, enrollment, getCurrentClassroom]);

  const getCoursesList = useCallback(async () => {
    await api.get(`/course/dashboard/list/${true}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setResponseCourseData(response.data);
        if (enrollment) {
          setSelectedCourse(enrollment.course_id);
          getClassroomList(enrollment.course_id);
        }
      }
    });
  }, [configModal, enrollment, getClassroomList, handleVisible]);

  const handleCourseChange = useCallback((value) => {
    getClassroomList(value.value);
    setSelectedCourse(value.value);
  }, [getClassroomList]);

  const handleClassroomChange = useCallback((value) => {
    getCurrentClassroom(value.value);
  }, [getCurrentClassroom]);

  const enrollmentSetup = useCallback((enrollmentData: IEnrollment) => {
    const temp: IEnrollment = {
      ...enrollmentData,
      classroom_begin_date: `${enrollmentData?.classroom_month}/${enrollmentData?.classroom_year}`,
      classroom_shift_formatted: enrollmentData?.classroom_shift?.reduce((prev, curr) => `${prev} e ${curr}`),
      course_cost: currencyFormatted(enrollmentData.course_cost),
    };

    setSelectedEnrollmentType(temp.status);
    setSelectedPayment(temp.payed_method || (temp.classroom_is_free ? 'Gratuito' : 'Não Efetuado'));
    setSelectedPartner(temp.student_partner?.id || 'Nenhum');
    setSelectedSgeSituation(temp.registered_in_sge ? 'Efetuado' : 'Não Efetuado');

    setLocalEnrollment(temp);
  }, []);

  const createEnrollment = useCallback(async (data: IEnrollment) => {
    await api.post(`/enrollment/dashboard/${selectedClassroom}`, {
      partner_id: selectedPartner === 'Nenhum' ? undefined : selectedPartner,
      student_object: student,
      status: selectedEnrollmentType,
      sge_situation: false,
      payment_method: selectedPayment,
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('A matrícula foi realizada com sucesso', 'success');
        handleVisible();
        nextStage(2);
      }
    });
  }, [selectedClassroom,
    selectedPartner,
    student,
    selectedEnrollmentType,
    selectedPayment,
    configModal,
    handleVisible,
    nextStage]);

  const updateEnrollment = useCallback(async (data: IEnrollment) => {
    await api.put(`/student/dashboard/${localEnrollment?.id}`, {
      ...data,
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Atualizado com sucesso', 'success');
        handleVisible();
      }
    });
  }, [configModal, localEnrollment?.id, handleVisible]);

  const handleSubmit = useCallback(async (data: IEnrollment) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        course_id: Yup.string()
          .test('has-gender', 'Curso obrigatório', () => !!selectedCourse),
        classroom: Yup.string()
          .test('has-gender', 'Turma obrigatória', () => !!selectedClassroom),
        enrollment_type: Yup.string()
          .test('has-gender', 'Situação obrigatória', () => !!selectedEnrollmentType),
        payment_method: Yup.string()
          .test('has-gender', 'Pagamento obrigatório', () => !!selectedPayment),
        sge_situation: Yup.string()
          .test('has-gender', 'Cadastro obrigatório', () => !!selectedSgeSituation),
        partner: Yup.string()
          .test('has-gender', 'Parceiro obrigatório', () => !!selectedPartner),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (isEditing) await updateEnrollment(data);
      else await createEnrollment(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [
    isEditing,
    createEnrollment,
    selectedClassroom,
    selectedCourse,
    selectedEnrollmentType,
    selectedPartner,
    selectedPayment,
    selectedSgeSituation,
    updateEnrollment]);

  useEffect(() => {
    if (enrollment) enrollmentSetup(enrollment);
  }, [enrollment, enrollmentSetup]);

  useEffect(() => {
    getCoursesList();
  }, []);

  // useEffect(() => {
  //   console.log(selectedCourse);
  //   console.log(coursesList);
  // }, [selectedCourse, coursesList]);

  return (
    <Container>
      <ContentPanel
        title="Informações do Curso"
        subTitle="Detalhes do curso selecionado pelo aluno"
        footerContent={(
          <>
            <Button
              styleType="outline"
              maxWidth="150px"
              minHeight="44px"
              onClick={() => handleCancel()}
            >
              cancelar
            </Button>
            <Button
              maxWidth="150px"
              minHeight="44px"
              onClick={() => formRef.current?.submitForm()}
            >
              salvar
            </Button>
          </>
          )}
        gridColumn="2 / 5"
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={localEnrollment}>
          <FormSection gridColumn="1 / 2">
            <SelectLine
              name="course_id"
              label="Curso"
              isSearchable
              options={coursesList}
              value={coursesList
                .filter(({ value }) => value === selectedCourse)}
              onChange={handleCourseChange}
            />

            <InputSection grid_template_column="1fr auto">

              <SelectLine
                name="classroom"
                label="Turma"
                isSearchable
                options={classroomList}
                value={classroomList
                  .filter(({ value }) => value === selectedClassroom)}
                onChange={handleClassroomChange}
              />

              <Button
                styleType="outline"
                width="58px"
                maxHeight="34px"
                iconWithMargin={false}
              >
                <MdSwapHoriz size={24} />
              </Button>
            </InputSection>

            <InputSection grid_template_column="70%">
              <InputLine
                name="classroom_begin_date"
                label="Previsão de Início"
                disabled
              />

              <InputLine
                name="classroom_shift_formatted"
                label="Turno"
                disable
              />

              <SelectLine
                name="partner"
                label="Parceria"
                options={partnerOptions}
                value={partnerOptions
                  .filter(({ value }) => value === selectedPartner)}
                onChange={(event: any) => setSelectedPartner(event.value)}
              />

              <SelectLine
                name="payment_method"
                label="Pagou"
                options={paymentOptions}
                value={paymentOptions
                  .filter(({ value }) => value === selectedPayment)}
                onChange={(event: any) => setSelectedPayment(event.value)}
              />

              <InputLine
                name="course_cost"
                label="Valor R$"
                disabled
              />

              <SelectLine
                name="sge_situation"
                label="Cadastro SGE"
                options={sgeOptions}
                value={sgeOptions
                  .filter(({ value }) => value === selectedSgeSituation)}
                onChange={(event: any) => setSelectedSgeSituation(event.value)}
              />

              <SelectLine
                name="enrollment_type"
                label="Situação da matrícula"
                options={enrollmentTypeOptions}
                value={enrollmentTypeOptions
                  .filter(({ value }) => value === selectedEnrollmentType)}
                onChange={(event: any) => setSelectedEnrollmentType(event.value)}
              />
            </InputSection>
          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default EnrollmentsPanel;
