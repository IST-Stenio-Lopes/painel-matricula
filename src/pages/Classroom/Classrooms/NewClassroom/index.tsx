import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import SelectLine from '../../../../components/Forms/SelectLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';
import {
  dayOptions, categoryOptions, monthOptions, shiftOptions, statusOptions, typeOptions,
} from '../../data/options';
import { IClassroom } from '../../data/types';
import { Container, FormContent } from './styles';

interface OptionsResponse {
  id: string;
  name:string
}

const NewClassroom: React.FC = () => {
  const { configModal, handleVisible } = useModal();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentClassroom, setCurrentClassroom] = useState<IClassroom | undefined>(undefined);
  const location: any = useLocation();

  const [responseData, setResponseData] = useState<OptionsResponse[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedShift, setSelectedShift] = useState<string[]>();
  const [selectedDay, setSelectedDay] = useState<string[]>();
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();

  const coursesList = useMemo(() => responseData.map(({ id, name }) => ({
    value: id,
    label: name,
  })), [responseData]);

  const getCurrentCoursesList = useCallback(async () => {
    await api.get(`/course/dashboard/list/${false}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setResponseData(response.data);
      }
    });
  }, [configModal, handleVisible]);

  const createClassroom = useCallback(async (data: IClassroom) => {
    await api.post('/classroom/dashboard', {
      course_id: selectedCourse,
      category: selectedCategory,
      shift: selectedShift,
      application_deadline: data.application_deadline,
      days_of_presence: selectedDay,
      month: selectedMonth,
      year: data.year,
      is_free: selectedType === 'Gratuito',
      number_of_vacancies: data.number_of_vacancies,
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        console.log('sucesso');
        navigate(-1);
      }
    });
  }, [
    configModal,
    handleVisible,
    navigate,
    selectedCourse,
    selectedCategory,
    selectedDay,
    selectedMonth,
    selectedShift,
    selectedType]);

  const updateClassroom = useCallback(async (data: IClassroom) => {
    await api.put(`/classroom/dashboard/${currentClassroom?.object_id}`, {

    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Atualizado com sucesso', 'success');
        handleVisible();
        navigate(-1);
      }
    });
  }, [configModal, currentClassroom?.object_id, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        course: Yup.string()
          .test('has-course', 'Curso obrigatório', () => !!selectedCourse),
        category: Yup.string()
          .test('has-category', 'Categoria obrigatória', () => !!selectedCategory),
        days_of_presence: Yup.mixed().when('category', {
          is: 'Presencial',
          then: Yup.mixed()
            .test('has-day', 'Dia obrigatório', () => (selectedDay ? selectedDay?.length > 0 : false)),
          otherwise: Yup.mixed().notRequired(),
        }),

        month: Yup.string()
          .test('has-month', 'Mês obrigatório', () => !!selectedMonth),
        shift: Yup.mixed()
          .test('has-shift', 'Turno obrigatório', () => (selectedShift ? selectedShift?.length > 0 : false)),
        status: Yup.string()
          .test('has-status', 'Status obrigatório', () => !!selectedStatus),
        is_free: Yup.string()
          .test('has-type', 'Tipo obrigatório', () => !!selectedType),

        application_deadline: Yup.number()
          .typeError('Prazo obrigatório')
          .test('has-cost', 'Deve ser maior que 0', (value) => value as number > 0),
        number_of_vacancies: Yup.number()
          .typeError('Vagas obrigatória')
          .test('has-cost', 'Deve ser maior que 0', (value) => value as number > 0),
        year: Yup.string()
          .test('has-cost', 'Ano inválido', (value) => (value as string).length === 4)
          .required('Ano obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('1');
      if (currentClassroom) { console.log('2'); await updateClassroom(data); } else { console.log('3'); await createClassroom(data); }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
      console.dir(err);
    } finally {
      setLoading(false);
      console.dir('terminou');
    }
  }, [
    createClassroom,
    currentClassroom,
    selectedCategory,
    selectedCourse,
    selectedDay,
    selectedMonth,
    selectedShift,
    selectedStatus,
    selectedType,
    updateClassroom]);

  const getCurrentClassroom = useCallback(async () => {
    await api.get(`/classroom/dashboard/specific/${location.state?.classroom.object_id}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentClassroom(response.data);
      } else {
        setCurrentClassroom(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.classroom]);

  useEffect(() => {
    if (location.state?.classroom) {
      getCurrentClassroom();
    } else setCurrentClassroom(undefined);

    formRef.current?.setErrors({});
  }, []);

  useEffect(() => {
    getCurrentCoursesList();
  }, [getCurrentCoursesList]);

  return (
    <Container>
      <ContentPanel
        title="Informações da turma"
        subTitle="Estas informações serão exibidas no aplicativo para o usuário"
        footerContent={(
          <Button
            onClick={() => formRef.current?.submitForm()}
            maxWidth="150px"
            minHeight="44px"
          >
            salvar
          </Button>
)}
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit}>
          <FormSection gridColumn="1 / 2">
            <SelectLine
              name="course"
              label="Curso"
              isSearchable
              options={coursesList}
              value={coursesList.filter(({ value }) => value === selectedCourse)}
              onChange={(event: any) => setSelectedCourse(event.value)}
            />

            <InputSection grid_template_column="1fr 1fr">
              <SelectLine
                name="category"
                label="Modo"
                isSearchable
                options={categoryOptions}
                value={categoryOptions.filter(({ value }) => value === selectedCategory)}
                onChange={(event: any) => setSelectedCategory(event.value)}
              />
              <SelectLine
                name="shift"
                label="Turno"
                isSearchable
                isMulti
                options={shiftOptions}
                value={shiftOptions.filter(({ value }) => selectedShift?.includes(value))}
                onChange={(event: any) => {
                  setSelectedShift(event.map(({ value }: any) => value));
                }}
              />
              {(selectedCategory === 'Semipresencial' || selectedCategory === 'Presencial')
                && (
                <SelectLine
                  name="days_of_presence"
                  label="Dia de Aula"
                  gridColumn="1 / 3"
                  isSearchable
                  isMulti
                  options={dayOptions}
                  value={dayOptions.filter(({ value }) => selectedDay?.includes(value))}
                  onChange={(event: any) => {
                    setSelectedDay(event.map(({ value }: any) => value));
                  }}
                />
                )}

              <InputLine
                name="application_deadline"
                label="Pré Matrícula (Prazo em dias)"
                mask="numeric"
              />
            </InputSection>

            <InputSection grid_template_column="1fr 1fr">
              <SelectLine
                name="month"
                label="Mês de Início"
                isSearchable
                options={monthOptions}
                value={monthOptions.filter(({ value }) => value === selectedMonth)}
                onChange={(event: any) => setSelectedMonth(event.value)}
              />
              <InputLine
                name="year"
                label="Ano"
                mask="numeric"
                maxLength={4}
              />

              <SelectLine
                name="is_free"
                label="Tipo"
                isSearchable
                options={typeOptions}
                value={typeOptions.filter(({ value }) => value === selectedType)}
                onChange={(event: any) => setSelectedType(event.value)}
              />
              <InputLine
                name="number_of_vacancies"
                label="Vagas"
                mask="numeric"
              />
              <SelectLine
                name="status"
                label="Status"
                gridRow="3 / 3"
                options={statusOptions}
                value={statusOptions.filter(({ value }) => value === selectedStatus)}
                onChange={(event: any) => setSelectedStatus(event.value)}
              />

            </InputSection>
          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default NewClassroom;