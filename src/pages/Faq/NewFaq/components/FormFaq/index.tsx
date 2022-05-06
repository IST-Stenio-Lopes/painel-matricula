import { FormHandles } from '@unform/core';
import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../components/Forms/InputLine';
import { InputSection } from '../../../../../components/Forms/InputSection';
import SelectLine from '../../../../../components/Forms/SelectLine';
import TextAreaLine from '../../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../../components/Panels/ContentPanel';

import {
  Container, FormContent,
} from './styles';
import getValidationErros from '../../../../../utils/getValidationErrors';
import api from '../../../../../services/api';
import { useModal } from '../../../../../hooks/modal';

export interface IFaq {
  id: string,
  object_id: string,
  title: string,
  category: string,
  content: string,
  created_at: string,
  status: string,
}

const FormFaq: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentFaq, setCurrentFaq] = useState<IFaq | undefined>(undefined);
  const location: any = useLocation();
  const [categorySelected, setCategorySelected] = useState(currentFaq ? currentFaq.category : '');

  const categoryOptions = useMemo(() => ([
    { value: 'Atendente', label: 'Atendente' },
    { value: 'Coordenador', label: 'Coordenador' },
    { value: 'Diretor', label: 'Diretor' },
    { value: 'Tesoureiro', label: 'Tesoureiro' },
    { value: 'Visitante', label: 'Visitante' },
  ]), []);

  const handleChangeCategory = useCallback((event) => {
    setCategorySelected(event.value);
  }, []);

  const createFaq = useCallback(async (data: IFaq) => {
    await api.post('/faq/dashboard', {
      title: data.title,
      category: categorySelected,
      content: data.content,
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        navigate(-1);
      }
    });
  }, [categorySelected, configModal, handleVisible, navigate]);

  const updateFaq = useCallback(async (data: IFaq) => {
    await api.put(`/faq/dashboard/${currentFaq?.object_id}`, {
      title: data.title,
      category: categorySelected,
      content: data.content,
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Atualizado com sucesso', 'success');
        handleVisible();
        navigate(-1);
      }
    });
  }, [categorySelected, configModal, currentFaq?.object_id, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string()
          .required('Tópico obrigatório'),
        category: Yup.string()
          .test('has-category', 'Categoria obrigatória', () => !!categorySelected),

        content: Yup.string()
          .required('Texto obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (currentFaq) await updateFaq(data);
      else await createFaq(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [categorySelected, createFaq, currentFaq, updateFaq]);

  const getCurrentFaq = useCallback(async () => {
    await api.get(`/faq/dashboard/specific/${location.state?.faq.object_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentFaq(response.data);
        setCategorySelected(response.data.category);
      } else {
        setCurrentFaq(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.faq]);

  useEffect(() => {
    if (location.state?.faq) {
      getCurrentFaq();
    } else setCurrentFaq(undefined);

    formRef.current?.setErrors({});

    return () => {
      setCurrentFaq(undefined);
    };
  }, [getCurrentFaq, location.state?.faq]);

  return (
    <Container>
      <ContentPanel
        title="Perguntas Frequentes"
        subTitle="Estas informações serão apresentadas no aplicativo"
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
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={currentFaq}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="title"
              label="Tópico"
            />
            <InputSection grid_template_column="1fr 1fr">
              <SelectLine
                name="category"
                label="Categoria"
                isSearchable
                value={categoryOptions.filter(({ value }) => value === categorySelected)}
                onChange={handleChangeCategory}
                options={categoryOptions}
              />
            </InputSection>

            <TextAreaLine
              name="content"
              label="Texto"
              rows={20}
            />

          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormFaq;
