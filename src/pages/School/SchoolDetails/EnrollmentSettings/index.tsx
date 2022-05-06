import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import CheckboxInput from '../../../../components/Forms/Checkbox';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import SelectLine from '../../../../components/Forms/SelectLine';
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

const options = [
  { value: 'dia/dias', label: 'dia/dias' },
  { value: 'semana/semanas', label: 'semana/semanas' },
  { value: 'mês/meses', label: 'mês/meses' },
  { value: 'ano/anos', label: 'ano/anos' },
];
const EnrollmentSettings: React.FC = () => {
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

  const getCurrentSchool = useCallback(async () => {
    await api.get(`/school/dashboard/specific/${location.state?.school.object_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
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
        title="Configuração de Matrículas"
        subTitle="As informações abaixo afetam as matrículas gratuitas e pré-matrículas"
        footerContent={<Button maxWidth="150px" minHeight="44px">salvar</Button>}
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={currentSchool}>
          <FormSection gridColumn="1 / 2">
            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="free_enrollment_block_time"
                label="Prazo pré-matrícula"
              />
            </InputSection>

            {/* <CheckboxInput
              name="free_enrollment_block"
              label="Ativar"
            /> */}
            <InputSection grid_template_column="1fr 1fr">

              <InputLine
                mask="numeric"
                name="free_enrollment_block_time"
                label="Tempo de carência para matrícula"
              />

              <SelectLine
                name="time"
                label="Período"
                options={options}
              />
            </InputSection>

            <h3>
              Ao ativar a função de tempo de carência, o estudante que tenha
              ingressado em um curso gratuito ficará impossibilitado
              de matricular-se em cursos gratuitos até o fim do prazo estipulado
              <br />
              <br />
              OBS: Mesmo com o tempo de carência ativado, é possível forçar a
              criação de uma matrícula em um curso gratuito.
            </h3>

          </FormSection>

        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default EnrollmentSettings;
