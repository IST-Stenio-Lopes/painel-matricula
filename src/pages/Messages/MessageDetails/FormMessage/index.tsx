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

import {
  Container, FormContent,
} from './styles';

export interface IMessage {
  id: string,
  object_id: string,
  student_name: string,
  subject: string,
  cellphone: string,
  whatsapp: string,
  email: string,
  created_at: string,
}

const FormMessage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentMessage, setCurrentMessage] = useState<IMessage | undefined>(undefined);
  const [categorySelected, setCategorySelected] = useState(currentMessage ? currentMessage.subject : '');
  const location: any = useLocation();

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

  const getCurrentMessage = useCallback(async () => {
    await api.get(`/faq/dashboard/specific/${location.state?.message.object_id}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentMessage(response.data);
        setCategorySelected(response.data.category);
      } else {
        setCurrentMessage(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.message]);

  useEffect(() => {
    if (location.state?.message) {
      getCurrentMessage();
    } else setCurrentMessage(undefined);

    formRef.current?.setErrors({});
  }, []);

  return (
    <Container>
      <ContentPanel
        title="Perguntas Frequentes"
        subTitle="Estas informações serão apresentadas no aplicativo"
        footerContent={<Button maxWidth="150px" minHeight="44px">salvar</Button>}
        width="50%"
      >
        <FormContent onSubmit={() => {}}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="nome"
              label="Nome"
              disable
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="assunto"
                label="Assunto"
                disable
              />
              <InputLine
                name="telefone"
                label="Telefone"
                gridRow="2 / 2"
                disable
              />
              <InputLine
                name="whats"
                label="Whatsapp"
                gridRow="3 / 3"
                disable
              />
            </InputSection>

            <InputLine
              name="email"
              label="Email"
              disable
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="data"
                label="Data"
                disable
              />
            </InputSection>

            <TextAreaLine
              name="mensagem"
              label="Mensagem"
              rows={6}
              disable
            />

          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormMessage;
