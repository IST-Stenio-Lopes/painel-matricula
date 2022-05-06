import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import * as Yup from 'yup';
import { useModal } from '../../hooks/modal';
import { IAttachment } from '../../pages/Enrollment/NewEnrollment/FormEnrollment/components/AttachmentsPanel';
import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErrors';
import { Button } from '../Forms/Buttons/Button';
import CloseButton from '../Forms/Buttons/CloseButton';
import DropzoneInput from '../Forms/DropzoneInput';
import { InputLine } from '../Forms/InputLine';
import { InputSection } from '../Forms/InputSection';
import SelectLine from '../Forms/SelectLine';

import {
  Container, Content, Header, HorizontalContent, TextHeaderArea, IconContent, Body, Footer,
} from './styles';

interface AttachmentModalProps {
  handleClose: Function;
  studentId?: string;
  enrollmentId?: string;
}

const typeOptions = [
  { value: 'Pessoal', label: 'Pessoal' },
  { value: 'Matrícula', label: 'Matrícula' },
];

const documentsOptions = [
  { value: 'CPF', label: 'CPF' },
  { value: 'RG', label: 'RG' },
  { value: 'CNH', label: 'CNH' },
  { value: 'Certidão de Nascimento', label: 'Certidão de Nascimento' },
  { value: 'Comprovante de Residência', label: 'Comprovante de Residência' },
  { value: 'Comprovante de Renda', label: 'Comprovante de Renda' },
  { value: 'Comprovante de Baixa Renda', label: 'Comprovante de Baixa Renda' },
  { value: 'Comprovante de Pagamento', label: 'Comprovante de Pagamento' },
  { value: 'Outro', label: 'Outro' },
];

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  handleClose,
  studentId,
  enrollmentId,
}) => {
  const { configModal, handleVisible } = useModal();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [files, setFiles] = useState<any>();

  const [selectedType, setSelectedType] = useState<string>();
  const [selectedDocument, setSelectedDocument] = useState<string>();

  const createStudentAttachment = useCallback(async (data: IAttachment) => {
    const formData = new FormData();

    files.forEach((file: any) => {
      formData.append('student_files', file);
    });

    formData.append('student_files_data', JSON.stringify([{
      name: data.name,
      type: selectedDocument,
    }]));

    await api.post(`/student/dashboard/documents/${studentId}`, formData).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O documento foi cadastrado com sucesso', 'success');
        handleVisible();
        handleClose();
      }
    });
  }, [configModal, files, handleVisible, selectedDocument, studentId, handleClose]);

  const createEnrollmentAttachment = useCallback(async (data: IAttachment) => {
    const formData = new FormData();

    files.forEach((file: any) => {
      formData.append('enrollment_files', file);
    });
    formData.append('enrollment_files_data', JSON.stringify([{
      name: data.name,
      type: selectedDocument,
    }]));

    await api.post(`/enrollment/dashboard/documents/${enrollmentId}`, formData).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O documento foi cadastrado com sucesso', 'success');
        handleVisible();
        handleClose();
      }
    });
  }, [configModal, files, handleVisible, selectedDocument, enrollmentId, handleClose]);

  const handleSubmit = useCallback(async (data: IAttachment) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        type: Yup.string()
          .test('has-type', 'Tipo obrigatório', () => !!selectedType),
        document: Yup.string()
          .test('has-document', 'Documento obrigatório', () => !!selectedDocument),
        files: Yup.mixed()
          .test('has-archive', 'Arquivo obrigatório', () => !!files),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (selectedType === 'Pessoal') await createStudentAttachment(data);
      else await createEnrollmentAttachment(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [createEnrollmentAttachment, createStudentAttachment, files, selectedDocument, selectedType]);

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

          <InputSection grid_template_column="1fr 1fr">

            <SelectLine
              name="document"
              label="Documento"
              options={documentsOptions}
              value={documentsOptions.filter(({ value }) => value === selectedDocument)}
              onChange={(event: any) => setSelectedDocument(event.value)}
            />

            <SelectLine
              name="type"
              label="Tipo"
              options={typeOptions}
              value={typeOptions.filter(({ value }) => value === selectedType)}
              onChange={(event: any) => setSelectedType(event.value)}
            />

          </InputSection>

          <DropzoneInput name="files" handleSetFile={setFiles} />
        </Body>
        <Footer>
          <Button
            styleType="outline"
            maxWidth="150px"
            minHeight="44px"
          >
            cancelar
          </Button>
          <Button
            loading={loading}
            maxWidth="150px"
            minHeight="44px"
            onClick={() => formRef.current?.submitForm()}
          >
            salvar
          </Button>
        </Footer>
      </Content>
    </Container>
  );
};

export default AttachmentModal;
