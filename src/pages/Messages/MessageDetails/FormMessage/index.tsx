import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import TextAreaLine from '../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import api from '../../../../services/api';
import { cellPhoneMasked } from '../../../../utils/masks';

import {
  Container, FormContent,
} from './styles';

export interface IMessage {
  id: string,
  object_id: string,
  student_name: string,
  subject: string,
  content: string,
  cellphone: string,
  whatsapp: string,
  email: string,
  created_at: string,
  status: string,
}

const FormMessage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { configModal, handleVisible } = useModal();
  const [currentMessage, setCurrentMessage] = useState<IMessage | undefined>(undefined);
  const location: any = useLocation();

  const messageSetup = useCallback((value: IMessage) => {
    const tempMessage: IMessage = {
      ...value,
      whatsapp: cellPhoneMasked(value.whatsapp),
      cellphone: cellPhoneMasked(value.cellphone),
      created_at: new Date(value.created_at).toLocaleDateString('pt-BR'),
    };

    setCurrentMessage(tempMessage);
  }, []);

  const getCurrentMessage = useCallback(async () => {
    await api.get(`/message/dashboard/specific/${location.state?.message.object_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        messageSetup(response.data);
      } else {
        setCurrentMessage(undefined);
      }
    });
  }, [location.state?.message.object_id, configModal, handleVisible, messageSetup]);

  useEffect(() => {
    if (location.state?.message) {
      getCurrentMessage();
    } else setCurrentMessage(undefined);

    formRef.current?.setErrors({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ContentPanel
        title="Perguntas Frequentes"
        subTitle="Estas informações serão apresentadas no aplicativo"
        footerContent={null}
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={() => {}} initialData={currentMessage}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="student_name"
              label="Nome"
              disable
            />

            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                name="subject"
                label="Assunto"
                disable
              />
              <InputLine
                name="cellphone"
                label="Telefone"
                gridRow="2 / 2"
                disable
              />
              <InputLine
                name="whatsapp"
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
                name="created_at"
                label="Data"
                disable
              />
            </InputSection>

            <TextAreaLine
              name="content"
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
