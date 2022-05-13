import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { MdAttachFile } from 'react-icons/md';
import * as Yup from 'yup';
import { Button } from '../../../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../../components/Forms/InputLine';
import { InputTags, ITag } from '../../../../../../components/Forms/InputTags';
import TextAreaLine from '../../../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../../../components/Panels/ContentPanel';
import { useAuth } from '../../../../../../hooks/auth';
import { useModal } from '../../../../../../hooks/modal';
import { EmailTypes, IEmailType } from '../../../../../../interfaces/ISchool';
import api, { baseURL } from '../../../../../../services/api';
import getValidationErros from '../../../../../../utils/getValidationErrors';
import { hasAllKeys } from '../../utils/utilities';
import Attachment from '../Attachment';
import EmailAttachmentModal from '../EmailAttachmentModal';

import {
  AttachmentContent, Attachments, ButtonArea, Container, FormContent,
} from './styles';

interface EmailPanelProps {
  selectedEmailType: EmailTypes;
  neededKeys: string[];
  initialValue: IEmailType | undefined;
}
const EmailPanel: React.FC<EmailPanelProps> = ({ selectedEmailType, neededKeys, initialValue }) => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { configModal, handleVisible } = useModal();
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState<string>();
  const [urlTemplate, setUrlTemplate] = useState<string>();
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [attachmentLis, setAttachmentList] = useState<any[]>([]);

  const [
    documents,
    setDocuments,
  ] = useState<ITag[]>(initialValue?.student_documents
    ? initialValue?.student_documents
      .map((doc) => ({
        id: doc,
        text: doc,
      })) : []);

  const [
    legalDocuments,
    setLegalDocuments,
  ] = useState<ITag[]>(
    initialValue?.legal_documents
      ? initialValue?.legal_documents
        .map((doc) => ({
          id: doc,
          text: doc,
        })) : [],
  );

  const handleSaveDoc = useCallback((doc: any) => {
    setAttachmentList([...attachmentLis, doc]);
  }, [attachmentLis]);

  const handleRemoveDoc = useCallback(async (doc) => {
    if (doc.id) {
      await api.delete(`/school/dashboard/email/${selectedEmailType}/${doc.id}`).catch((err) => {
        configModal(err.response.data.message || err.message, 'error');
        handleVisible();
      }).then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          const temp = [...attachmentLis];

          setAttachmentList([...temp.filter((file) => doc.name !== file.name)]);
        }
      });
    } else {
      const temp = [...attachmentLis];

      setAttachmentList([...temp.filter((file) => doc.name !== file.name)]);
    }
  }, [attachmentLis, configModal, handleVisible, selectedEmailType]);

  const handleChangeURL = useCallback(async (data, time = '') => {
    const temp = {
      subject: data.subject + time,
      header: data.header.split('\n'),
      body: data.body.split('\n'),
      legal_documents: legalDocuments?.map((item) => item.text),
      student_documents: documents?.map((item) => item.text),
    };

    const url = `${baseURL}:2223/school/dashboard/email/template?email_template=${JSON.stringify(temp)}&school_id=${user.school_id}&user_id=${user.id}`;

    setUrlTemplate(url);
  }, [documents, legalDocuments, user.id, user.school_id]);

  const handleSaveEmail = useCallback(async (data) => {
    const temp = {
      email_object: {
        subject: data.subject,
        header: data.header.split('\n'),
        body: data.body.split('\n'),
        legal_documents: legalDocuments?.map((item) => item.text),
        student_documents: documents?.map((item) => item.text),
      },
    };

    await api.patch(`/school/dashboard/email/${selectedEmailType}`, temp)
      .catch((err) => {
        configModal(err.response ? err.response.data.message : err.message, 'error');
        handleVisible();
      }).then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          configModal('Atualizado com sucesso', 'success');
          handleVisible();
        }
      });

    const formData = new FormData();

    const attachmentsToSend: any[] = [];

    attachmentLis.forEach(({ name, file }) => {
      if (file) {
        attachmentsToSend.push({
          name,
          type: selectedEmailType,
        });

        file.forEach((attachment: any) => {
          formData.append('school_template_files', attachment);
        });
      }
    });

    formData.append('school_template_files_data', JSON.stringify(attachmentsToSend));

    if (attachmentsToSend.length >= 1) {
      await api.post(`/school/dashboard/documents/${selectedEmailType}`, formData)
        .catch((err) => {
          configModal(err.response ? err.response.data.message : err.message, 'error');
          handleVisible();
        }).then((response) => {
          if (response?.status && response.status >= 200 && response.status <= 299) {
            const fileArray = [...attachmentLis.filter((doc) => !doc.file)];

            setAttachmentList([...fileArray, ...response.data.map(({ id, name }: any) => (
              { id, name }
            ))]);
          }
        });
    }
  }, [configModal, documents, attachmentLis, handleVisible, legalDocuments, selectedEmailType]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        subject: Yup.string()
          .required('Assunto obrigatório'),
        header: Yup.string().required('Cabeçalho obrigatória')
          .test('has-all-keys', 'Insira todas as palavras chaves informadas ao lado', (value) => hasAllKeys(value as string, neededKeys)),

        student_documents: Yup.string()
          .test('has-documents', 'Informe ao menos um documento', () => (documents ? documents.length >= 1 : false)),
        legal_documents: Yup.string()
          .test('has-documents', 'Informe ao menos um documento', () => (legalDocuments ? legalDocuments.length >= 1 : false)),

      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await handleSaveEmail(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);

        return;
      }
    } finally {
      setLoading(false);
    }
  }, [documents, handleSaveEmail, legalDocuments, neededKeys]);

  useEffect(() => {
    handleChangeURL(initialValue);
  }, [handleChangeURL, initialValue]);

  useEffect(() => {
    const temp = initialValue?.files && initialValue.files.map(({ id, name }) => (
      { id, name }
    ));

    setAttachmentList(temp ? [...temp] : []);
  }, [initialValue]);

  return (
    <Container>
      <ContentPanel
        title="Email"
        subTitle="Esse texto será encaminhado para o aluno via email"
        footerContent={(
          <>
            <Button
              styleType="outline"
              maxWidth="150px"
              minHeight="44px"
              onClick={() => handleChangeURL(
                formRef.current?.getData(),
                new Date().getTime().toString(),
              )}
            >
              refresh
            </Button>
            <Button
              loading={loading}
              onClick={() => formRef.current?.submitForm()}
              maxWidth="150px"
              minHeight="44px"
            >
              salvar
            </Button>
          </>
        )}
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={initialValue}>
          <FormSection gridColumn="1 / 2">

            <InputLine
              name="subject"
              label="Assunto"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />

            <TextAreaLine
              name="header"
              label="Cabeçalho"
              rows={8}
            />

            <InputTags
              name="student_documents"
              label="Documentos pessoais"
              placeholder="Pressione enter para incluir um novo documento"
              tags={documents as ITag[]}
              setTags={setDocuments}
            />

            <TextAreaLine
              name="body"
              label="Corpo"
              rows={8}
            />

            <InputTags
              name="legal_documents"
              label="Documentos do responsável legal"
              placeholder="Pressione enter para incluir um novo documento"
              tags={legalDocuments as ITag[]}
              setTags={setLegalDocuments}
            />

            <AttachmentContent>
              <ButtonArea>
                <Button
                  styleType="outline"
                  gridColumn="1 / 1"
                  maxHeight="44px"
                  leftIcon={<MdAttachFile size={18} />}
                  onClick={() => setShowAttachmentModal(!showAttachmentModal)}
                >
                  Adicionar anexo
                </Button>

              </ButtonArea>
              <h3>Anexos para esse email</h3>

              <Attachments>
                {attachmentLis.map((doc) => (
                  <Attachment
                    key={doc.name}
                    name={doc.name}
                    onRemove={() => handleRemoveDoc(doc)}
                  />
                ))}
              </Attachments>
            </AttachmentContent>

          </FormSection>
          <FormSection gridColumn="2 / 3">
            <h3>Preview</h3>
            {urlTemplate && <iframe title="Preview" src={urlTemplate} />}
          </FormSection>
        </FormContent>
      </ContentPanel>

      {showAttachmentModal && (
        <EmailAttachmentModal
          handleClose={() => setShowAttachmentModal(false)}
          onSaveDoc={handleSaveDoc}
          allFiles={attachmentLis}
        />
      )}
    </Container>
  );
};

export default EmailPanel;
