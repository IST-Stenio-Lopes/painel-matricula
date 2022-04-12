import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { FormHandles } from '@unform/core';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../../../../components/Forms/Buttons/Button';
import LinkButton from '../../../../../components/Forms/Buttons/LinkButton';
import { FormSection } from '../../../../../components/Forms/FormSection';
import { InputSection } from '../../../../../components/Forms/InputSection';
import { InputLine } from '../../../../../components/Forms/InputLine';
import SelectLine from '../../../../../components/Forms/SelectLine';
import TextAreaLine from '../../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../../components/Panels/ContentPanel';
import Grade from '../Grade';

import {
  Container, FormContent, GradeHeader, AddButtonArea,
} from './styles';
import { useModal } from '../../../../../hooks/modal';
import api from '../../../../../services/api';
import getValidationErros from '../../../../../utils/getValidationErrors';
import { InputTags, ITag } from '../../../../../components/Forms/InputTags';

export interface ICourse {
  id: string,
  object_id: string,
  name: string,
  field: string,
  modality: string,
  duration: string,
  cost: number,
  payment_installment: number,
  enrollment_fee: number,
  description: string,
  prerequisites: string,
  status: string,
  tags: ITag[],
  grade: any[]
}

interface IGrade {
  id: string;
  title: string | undefined;
  credits: string | undefined;
}

const FormCourse: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentCourse, setCurrentCourse] = useState<ICourse | undefined>(undefined);
  const [modalitySelected, setModalitySelected] = useState(currentCourse ? currentCourse.modality : '');
  const [fieldSelected, setFieldSelected] = useState(currentCourse ? currentCourse.field : '');
  const location: any = useLocation();

  const [grades, setGrades] = useState<IGrade[]>([
    {
      id: '0',
      title: undefined,
      credits: undefined,
    },
  ]);

  const [tags, setTags] = useState<ITag[]>(currentCourse?.tags || []);

  const handleAddGrade = useCallback(() => {
    const newGrade: IGrade = {
      id: `${grades.length}`,
      title: undefined,
      credits: undefined,
    };
    const temp = [...grades];
    temp.push(newGrade);
    setGrades(temp);
  }, [grades]);

  const handleRemoveGrade = useCallback((name) => {
    if (grades.length === 1) return;

    const tempGrades = grades.filter((grade) => grade.title !== name);

    setGrades(tempGrades);
  }, [grades]);

  const fieldOptions = useMemo(() => ([
    { value: 'Atendente', label: 'Atendente' },
    { value: 'Coordenador', label: 'Coordenador' },
    { value: 'Diretor', label: 'Diretor' },
    { value: 'Tesoureiro', label: 'Tesoureiro' },
    { value: 'Visitante', label: 'Visitante' },
  ]), []);

  const modalityOptions = useMemo(() => ([
    { value: 'Atendente', label: 'Atendente' },
    { value: 'Coordenador', label: 'Coordenador' },
    { value: 'Diretor', label: 'Diretor' },
    { value: 'Tesoureiro', label: 'Tesoureiro' },
    { value: 'Visitante', label: 'Visitante' },
  ]), []);

  const handleChangeField = useCallback((event) => {
    setFieldSelected(event.value);
  }, []);

  const handleChangeModality = useCallback((event) => {
    setModalitySelected(event.value);
  }, []);

  const handleGradeTitleChange = useCallback((value, id) => {
    let grade = grades.find((current) => current.id === id);

    if (grade) {
      const index = grades.indexOf(grade);

      grade = { ...grade, title: value };

      const temp = [...grades];

      temp[index] = grade;

      setGrades(temp);
    }
  }, [grades]);

  const handleGradeCreditsChange = useCallback((value, id) => {
    let grade = grades.find((current) => current.id === id);

    if (grade) {
      const index = grades.indexOf(grade);

      grade = { ...grade, credits: value };

      const temp = [...grades];

      temp[index] = grade;

      setGrades(temp);
    }
  }, [grades]);

  const createCourse = useCallback(async (data: ICourse) => {
    const gradesToSend = grades.map(({ title, credits }) => ({
      title,
      credits,
    }));

    await api.post('/course/dashboard', {
      name: data.name,
      field: fieldSelected,
      modality: modalitySelected,
      tags,
      duration: data.duration,
      cost: data.cost,
      payment_installment: data.payment_installment,
      enrollment_fee: data.enrollment_fee,
      description: data.description,
      prerequisites: data.prerequisites,
      grade: gradesToSend,
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        console.log('sucesso');
        navigate(-1);
      }
    });
  }, [fieldSelected, modalitySelected, tags, grades, configModal, handleVisible, navigate]);

  const updateCourse = useCallback(async (data: ICourse) => {
    const gradesToSend = grades.map(({ title, credits }) => ({
      title,
      credits,
    }));

    await api.put(`/course/dashboard/${currentCourse?.id}`, {
      name: data.name,
      field: fieldSelected,
      modality: modalitySelected,
      tags,
      duration: data.duration,
      cost: data.cost,
      payment_installment: data.payment_installment,
      enrollment_fee: data.enrollment_fee,
      description: data.description,
      prerequisites: data.prerequisites,
      grade: gradesToSend,
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
  }, [
    grades,
    currentCourse,
    fieldSelected,
    modalitySelected,
    tags,
    configModal,
    handleVisible,
    navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});
      const gradesValidation = grades.map((_, index) => (
        {
          [`grade${index}`]: Yup.string()
            .required('Conteúdo obrigatório'),
          [`hour${index}`]: Yup.number()
            .typeError(' ')
            .test('has-cost', ' ', (value) => value as number > 0),
        })).reduce((previousValue, currentValue) => ({ ...previousValue, ...currentValue }));

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        field: Yup.string()
          .test('has-field', 'Área obrigatória', () => !!fieldSelected),
        modality: Yup.string()
          .test('has-modality', 'Modalidade obrigatória', () => !!fieldSelected),

        duration: Yup.string()
          .required('Duração obrigatório'),

        cost: Yup.number()
          .typeError('Valor deve ser maior que 0')
          .test('has-cost', 'Valor obrigatório', (value) => value as number > 0),
        payment_installment: Yup.number()
          .typeError('Valor deve ser maior que 0')
          .test('has-payment', 'Parcela obrigatória', (value) => value as number > 0),

        description: Yup.string()
          .required('Descrição obrigatória'),
        prerequisites: Yup.string()
          .required('Pré requisitos obrigatório'),
        ...gradesValidation,
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (currentCourse) await updateCourse(data);
      else await createCourse(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [grades, currentCourse, updateCourse, createCourse, fieldSelected]);

  const getCurrentCourse = useCallback(async () => {
    await api.get(`/course/dashboard/specific/${location.state?.course.object_id}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        const courseResponse: ICourse = response.data;
        setCurrentCourse(courseResponse);
        setTags(courseResponse.tags);
        setFieldSelected(courseResponse.field);
        setModalitySelected(courseResponse.modality);
        setGrades(courseResponse.grade.map((grade: any, index: number) => (
          {
            id: `${index}`,
            ...grade,
          })));
      } else {
        setCurrentCourse(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.course]);

  useEffect(() => {
    if (location.state?.course) {
      getCurrentCourse();
    } else setCurrentCourse(undefined);

    formRef.current?.setErrors({});
  }, []);

  return (
    <Container>
      <ContentPanel
        title="Informações do Curso"
        subTitle="Estas informações serão exibidas no aplicativo para o usuário"
        footerContent={(
          <Button
            loading={loading}
            onClick={() => formRef.current?.submitForm()}
            maxWidth="150px"
            minHeight="44px"
          >
            salvar
          </Button>
)}
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={currentCourse || {}}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="name"
              label="Nome"
            />

            <InputSection grid_template_column="1fr 1fr">
              <SelectLine
                onChange={handleChangeField}
                name="field"
                label="Área"
                value={fieldOptions.filter(({ value }) => value === fieldSelected)}
                options={fieldOptions}
                gridRow="1 / 1"
              />
              <SelectLine
                onChange={handleChangeModality}
                name="modality"
                label="Modalidade"
                value={modalityOptions.filter(({ value }) => value === modalitySelected)}
                options={modalityOptions}
                gridRow="2 / 2"
              />
            </InputSection>

            <InputTags
              name="tags"
              label="Tags"
              tags={tags}
              setTags={setTags}
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="duration"
                label="Duração"
                gridRow="1 / 1"
              />

              <InputLine
                name="cost"
                label="Valor do Curso"
                gridRow="2 / 2"
              />

              <InputLine
                name="payment_installment"
                label="Parcelas"
                gridRow="2 / 2"
              />

              <InputLine
                name="enrollment_fee"
                label="Taxa de Matrícula"
                gridRow="3 / 3"
              />
            </InputSection>

          </FormSection>

          <FormSection gridColumn="2 / 3">
            <TextAreaLine
              name="description"
              label="Descrição"
              rows={8}
            />
            <TextAreaLine
              name="prerequisites"
              label="Pré Requisitos"
              rows={8}
            />
          </FormSection>
          <FormSection gridColumn="3 / 4" showBackgroundColor>
            <GradeHeader>
              <h2>Conteúdo Programático</h2>
              <h2>Horas</h2>
            </GradeHeader>
            {grades.map((grade, index) => (
              <Grade
                key={grade.id}
                index={index}
                title={grade?.title}
                credits={grade?.credits}
                handleDelete={() => handleRemoveGrade(grade?.title)}
                handleTitleChange={handleGradeTitleChange}
                handleCreditsChange={handleGradeCreditsChange}
              />
            ))}
            <AddButtonArea>
              <LinkButton
                icon={<HiPlus size={18} />}
                onClick={() => handleAddGrade()}
              >
                Adicionar
              </LinkButton>
            </AddButtonArea>
          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormCourse;
