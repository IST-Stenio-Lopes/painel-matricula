import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import { DateInputLine } from '../../../../components/Forms/DateInputLine';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import SelectLine from '../../../../components/Forms/SelectLine';
import TextAreaLine from '../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';
import PreviewContent from './components/PreviewContent';

import {
  Container, FormContent,
} from './styles';

interface IAdvertising {
  object_id: string,
  course_id: string,
  title: string,
  expiration_date: Date,
  type: string,
  discount_percentage: number,
  description: string,
  number_visualizations: number,
}

interface OptionsResponse {
  id: string;
  name:string
}

const FormAdvertising: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentAdvertising, setCurrentAdvertising] = useState<IAdvertising | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState<Date>();

  const location: any = useLocation();
  const [selectedType, setSelectedType] = useState(currentAdvertising ? currentAdvertising.type : '');

  const [responseOptions, setResponseOptions] = useState<OptionsResponse[]>([]);

  const typeOptions = useMemo(() => ([
    { value: 'Anúncio', label: 'Anúncio' },
    { value: 'Desconto', label: 'Desconto' },
  ]), []);

  const coursesList = useMemo(() => {
    const temp = [{ value: 'Todos', label: 'Todos' },
      ...responseOptions.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    ];

    return temp;
  }, [responseOptions]);

  const getCurrentCoursesList = useCallback(async () => {
    await api.get(`/course/dashboard/list/${false}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setResponseOptions(response.data);
      }
    });
  }, [configModal, handleVisible]);

  const createAdvertising = useCallback(async (data: IAdvertising) => {
    await api.post('/advertising/dashboard', {
      title: data.title,
      category: selectedType,
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        navigate(-1);
      }
    });
  }, [selectedType, configModal, handleVisible, navigate]);

  const updateAdvertising = useCallback(async (data: IAdvertising) => {
    await api.put(`/advertising/dashboard${currentAdvertising?.object_id}`, {
      title: data.title,
      category: selectedType,
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
  }, [selectedType, configModal, currentAdvertising?.object_id, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string()
          .required('Tópico obrigatório'),
        category: Yup.string()
          .test('has-category', 'Categoria obrigatória', () => !!selectedType),

        content: Yup.string()
          .required('Texto obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (currentAdvertising) await updateAdvertising(data);
      else await createAdvertising(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [selectedType, createAdvertising, currentAdvertising, updateAdvertising]);

  const getCurrentAdvertising = useCallback(async () => {
    await api.get(`/advertising/dashboard/specific/${location.state?.advertising.object_id}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentAdvertising(response.data);
        setSelectedType(response.data.category);
      } else {
        setCurrentAdvertising(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.advertising]);

  useEffect(() => {
    if (location.state?.advertising) {
      getCurrentAdvertising();
    } else setCurrentAdvertising(undefined);

    formRef.current?.setErrors({});

    return () => {
      setCurrentAdvertising(undefined);
    };
  }, [getCurrentAdvertising, location.state?.advertising]);

  useEffect(() => {
    getCurrentCoursesList();
  }, [getCurrentCoursesList]);

  return (
    <Container>
      <PreviewContent />
      <ContentPanel
        title="Informações do Anúncio"
        subTitle="Estas informações serão exibidas no aplicativo para o usuário"
        footerContent={(
          <Button
            onClick={() => formRef.current?.submitForm()}
            loading={loading}
            maxWidth="150px"
            minHeight="44px"
          >
            salvar
          </Button>
)}
        gridColumn="2 / 5"
        width="50%"
      >
        <FormContent onSubmit={() => {}}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="nome"
              label="Título"
            />

            <InputSection grid_template_column="1fr 1fr">
              <DateInputLine
                name="assunto"
                label="Expira em"
                newValue={expirationDate}
              />

              <SelectLine
                name="curso"
                label="Tipo"
                gridRow="2 / 2"
                options={typeOptions}
                value={typeOptions.filter(({ value }) => value === selectedType)}
                onChange={(event: any) => setSelectedType(event.value)}
              />

              {selectedType === 'Desconto' && (
                <InputLine
                  mask="numeric"
                  name="whats"
                  label="% do Desconto"
                  gridRow="2 / 2"
                />
              )}

            </InputSection>

            <SelectLine
              name="curso"
              label="Curso que receberá desconto"
              isSearchable
              options={coursesList}
            />

            <TextAreaLine
              name="mensagem"
              label="Texto"
              rows={6}
            />

          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormAdvertising;
