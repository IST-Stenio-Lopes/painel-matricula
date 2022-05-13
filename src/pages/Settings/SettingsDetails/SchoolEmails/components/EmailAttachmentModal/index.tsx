import { FormHandles } from '@unform/core';
import { da } from 'date-fns/locale';
import React, { useCallback, useRef, useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import * as Yup from 'yup';
import { Button } from '../../../../../../components/Forms/Buttons/Button';
import CloseButton from '../../../../../../components/Forms/Buttons/CloseButton';
import DropzoneInput from '../../../../../../components/Forms/DropzoneInput';
import { InputLine } from '../../../../../../components/Forms/InputLine';
import { useModal } from '../../../../../../hooks/modal';
import api from '../../../../../../services/api';
import getValidationErros from '../../../../../../utils/getValidationErrors';

import {
  Container, Content, Header, HorizontalContent, TextHeaderArea, IconContent, Body, Footer,
} from './styles';

interface EmailAttachmentModalProps {
  handleClose: Function;
  onSaveDoc: (doc: any) => void;
  allFiles: any[];
}

interface IAttachment {
  name: string;
}

const EmailAttachmentModal: React.FC<EmailAttachmentModalProps> = ({
  handleClose,
  allFiles,
  onSaveDoc,
}) => {
  const { configModal, handleVisible } = useModal();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [files, setFiles] = useState<any>();

  const handleSubmit = useCallback(async (data: IAttachment) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        files: Yup.mixed()
          .test('already-exist', 'Arquivo com o mesmo nome já existe', () => {
            if (files) {
              return !allFiles.find((f) => data.name === f.name);
            }

            return true;
          })
          .test('has-archive', 'Arquivo obrigatório', () => !!files),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      onSaveDoc({
        name: data.name,
        file: files,
      } as any);

      handleClose();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [allFiles, files, handleClose, onSaveDoc]);

  return (
    <Container>
      <Content>
        <Header>
          <HorizontalContent>
            <IconContent>
              <MdAttachFile size={40} />
            </IconContent>
            <TextHeaderArea>
              <h1>Carregue seu arquivo</h1>
            </TextHeaderArea>
          </HorizontalContent>
          <CloseButton onClick={() => handleClose()} />
        </Header>
        <Body ref={formRef} onSubmit={handleSubmit}>
          <InputLine
            name="name"
            label="Nome do Documento"
          />

          <DropzoneInput name="files" handleSetFile={setFiles} />
        </Body>
        <Footer>
          <Button
            styleType="outline"
            maxWidth="150px"
            minHeight="44px"
            onClick={() => handleClose()}
          >
            cancelar
          </Button>
          <Button
            loading={loading}
            maxWidth="150px"
            minHeight="44px"
            onClick={() => formRef.current?.submitForm()}
          >
            carregar
          </Button>
        </Footer>
      </Content>
    </Container>
  );
};

export default EmailAttachmentModal;
