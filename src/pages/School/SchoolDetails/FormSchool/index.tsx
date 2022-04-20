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
import TextAreaLine from '../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';
import { telMasked } from '../../../../utils/masks';

import {
  Container, FormContent,
} from './styles';

export interface ISchool {
  id: string,
  object_id: string,
  name: string,
  initials: string,
  street: string,
  number: string,
  neighborhood: string,
  zipcode: string,
  city: string,
  estate: string,
  phone: string,
  whatsapp_enabled: true,
  whatsapp_number: string,
  email: string,
  business_hours: string,
  gps_location: string,
  payment_pv: string,
  payment_token: string,
  business_model: string,
  application_deadline: string,
  application_payment_tax: string,
  pre_registration_email: string,
  application_email: string,
  lean_office_email: string,
  free_enrollment_block: true,
  free_enrollment_block_time: string,
  status: string,
  updated_at: string,
  created_at: string
}
const FormSchool: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentSchool, setCurrentSchool] = useState<ISchool | undefined>(undefined);
  const [categorySelected, setCategorySelected] = useState(currentSchool ? currentSchool.status : '');
  const location: any = useLocation();

  const configSchool = useCallback((school: ISchool) => {
    const temp = {
      ...school,
      phone: telMasked(school.phone),
    };

    setCurrentSchool(temp);
  }, []);

  const createSchool = useCallback(async (data: ISchool) => {
    await api.post('/school/dashboard', {
      category: categorySelected,
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
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
      configModal(err.response.data.message, 'error');
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

  const getCurrentSchool = useCallback(async () => {
    await api.get(`/school/dashboard/specific/${location.state?.school.object_id}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configSchool(response.data);
        console.dir(response.data);
      } else {
        setCurrentSchool(undefined);
      }
    });
  }, [configModal, configSchool, handleVisible, location.state?.school.object_id]);

  useEffect(() => {
    if (location.state?.school) {
      getCurrentSchool();
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
                name="free_enrollment_block_time"
                label="Prazo pré-matrícula"
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
