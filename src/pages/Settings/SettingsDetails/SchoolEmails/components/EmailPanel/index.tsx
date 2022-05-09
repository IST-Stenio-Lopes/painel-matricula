import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
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

import { Container, FormContent } from './styles';

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

  // const [headerValue, setHeaderValue] = useState(initialValue.header.replaceAll('\n', '<br/>'));

  // const onChangeHeader = useCallback((newValue) => {
  //   let temp = newValue.replaceAll('\n', '<br/>');
  //   const editor = document.getElementById('Header Input');
  //   const newValueMatches: string[] = temp.match(/(?<=\[)[^\][]*(?=])/g);

  //   newValueMatches.forEach((value) => {
  //     if (neededKeys.includes(value)) {
  //       temp = temp.replaceAll(`[${value}]`, `<b style='color:blue'>[${value}]</b>`);
  //     } else {
  //       temp = temp.replaceAll(`[${value}]`, `<b style='color:red'>[${value}]</b>`);
  //     }
  //   });
  //   (editor as HTMLElement).innerHTML = temp;
  // }, []);

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

    await api.patch(`/school/dashboard/email/${selectedEmailType}`, { ...temp })
      .catch((err) => {
        configModal(err.response ? err.response.data.message : err.message, 'error');
        handleVisible();
      }).then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          configModal('Atualizado com sucesso', 'success');
          handleVisible();
        }
      });
  }, [configModal, documents, handleVisible, legalDocuments, selectedEmailType]);

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
    handleChangeURL(formRef.current?.getData());
  }, [handleChangeURL]);

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

          </FormSection>
          <FormSection gridColumn="2 / 3">
            <h3>Preview</h3>
            {urlTemplate && <iframe title="Preview" src={urlTemplate} />}
          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default EmailPanel;
