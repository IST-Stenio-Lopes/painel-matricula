import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import TextAreaLine from '../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import { useSchool } from '../../../../hooks/school';
import { ISchool } from '../../../../interfaces/ISchool';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';
import { telMasked } from '../../../../utils/masks';

import {
  Container, FormContent,
} from './styles';

const FormSchool: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { currentSchool: school } = useSchool();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentSchool, setCurrentSchool] = useState<ISchool | undefined>(undefined);
  const [categorySelected, setCategorySelected] = useState(currentSchool ? currentSchool.status : '');
  const location: any = useLocation();

  const configSchool = useCallback((data: ISchool) => {
    const temp = {
      ...data,
      phone: telMasked(data.phone),
    };

    setCurrentSchool(temp);
  }, []);

  const createSchool = useCallback(async (data: ISchool) => {
    await api.post('/school/dashboard', {
      category: categorySelected,
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        console.log('sucesso');
        navigate(-1);
      }
    });
  }, [categorySelected, configModal, handleVisible, navigate]);

  const updateSchool = useCallback(async (data: ISchool) => {
    await api.put(`/school/dashboard/${currentSchool?.object_id}`, {
      category: categorySelected,
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
  }, [categorySelected, configModal, currentSchool?.object_id, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Tópico obrigatório'),
        category: Yup.string()
          .test('has-category', 'Categoria obrigatória', () => !!categorySelected),

        content: Yup.string()
          .required('Texto obrigatório'),
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
  }, [categorySelected, createSchool, currentSchool, updateSchool]);

  useEffect(() => {
    if (school) {
      configSchool(school);
    } else setCurrentSchool(undefined);

    formRef.current?.setErrors({});
  }, []);

  return (
    <Container>
      <ContentPanel
        title="Informações da Unidade"
        subTitle="Estas informações serão exibidas no aplicativo para o usuário"
        footerContent={<Button maxWidth="150px" minHeight="44px">salvar</Button>}
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
                name="phone"
                label="Telefone"
                gridRow="3 / 3"
              />

              <InputLine
                name="zipcode"
                label="CEP"
                gridRow="4 / 4"
              />

              <Button
                styleType="outline"
                gridColumn="2 / 3"
                gridRow="4 / 4"
                width="58px"
                maxHeight="34px"
              >
                Ok
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
                name="estate"
                label="Estado"
              />
            </InputSection>

          </FormSection>
          <FormSection gridColumn="2 / 3">
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
