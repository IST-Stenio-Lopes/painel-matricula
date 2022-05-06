import { FormHandles } from '@unform/core';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
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
import { EmailTypes } from '../../../../../../interfaces/ISchool';
import api, { baseURL } from '../../../../../../services/api';
import getValidationErros from '../../../../../../utils/getValidationErrors';
import { hasAllKeys } from '../../utils/utilities';

import { Container, FormContent } from './styles';

const neededKeys = [
  'Nome do Aluno',
  'Curso',
  'Turno',
  'Unidade',
  'Email',
  'Dias',
];

interface EmailPanelProps {
  selectedEmailType: EmailTypes;
}
const EmailPanel: React.FC<EmailPanelProps> = ({ selectedEmailType }) => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { configModal, handleVisible } = useModal();
  const initialValue = useMemo(() => ({
    subject: 'A um passo de concluir sua matrícula*',
    header: 'Olá [Nome do Aluno]!\n\nVocê acabou de se pré-matricular no curso [Curso] no turno da [Turno] da unidade [Unidade].\n\nSua vaga ficará reservada por [Dias] dias. Para confirmar sua matrícula será necessário que preencha os documentos em anexo e envie-os para o e-mail da unidade [Email] com os seguintes documentos:',
    student_documents: [
      {
        id: 'RG ou CNH',
        text: 'RG ou CNH',
      },
      {
        id: 'CPF',
        text: 'CPF',
      },
      {
        id: 'Comprovante de residência (atualizado)',
        text: 'Comprovante de residência (atualizado)',
      },
      {
        id: 'Certificado de escolaridade ou Declaração escolar',
        text: 'Certificado de escolaridade ou Declaração escolar',
      },
      {
        id: 'Cartão de Vacina (Covid-19)',
        text: 'Cartão de Vacina (Covid-19)',
      },
      {
        id: 'Carteira de trabalho (Se industriário)',
        text: 'Carteira de trabalho (Se industriário)',
      },
      {
        id: 'Documentos em anexo preenchidos',
        text: 'Documentos em anexo preenchidos',
      },
    ],
    body: 'Quer tornar seu atendimento presencial mais rápido? \n \n Responda este e-mail, anexe as cópias dos documentos citados anteriormente. E no ato do atendimento, verificaremos os documentos originais.\n \n Para menores de 18 anos, o responsável legal também deverá comparecer munido de seu documento de identificação:',
    legal_documents: [
      {
        id: 'RG ou CNH',
        text: 'RG ou CNH',
      },
    ],
  }), []);
  const [loading, setLoading] = useState(false);
  const [urlDoc, setUrlDoc] = useState();
  const [studentName, setStudentName] = useState<string>();
  const [urlTemplate, setUrlTemplate] = useState<string>();

  const [documents, setDocuments] = useState<ITag[]>(initialValue.student_documents);
  const [legalDocuments, setLegalDocuments] = useState<ITag[]>(initialValue.legal_documents);

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
      legal_documents: legalDocuments.map((item) => item.text),
      student_documents: documents.map((item) => item.text),
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
        legal_documents: legalDocuments.map((item) => item.text),
        student_documents: documents.map((item) => item.text),
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
          .test('has-documents', 'Informe ao menos um documento', () => documents && documents.length >= 1),
        legal_documents: Yup.string()
          .test('has-documents', 'Informe ao menos um documento', () => legalDocuments && legalDocuments.length >= 1),

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
  }, [documents, handleSaveEmail, legalDocuments]);

  useEffect(() => {
    handleChangeURL(formRef.current?.getData());
  }, []);

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
              tags={documents}
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
              tags={legalDocuments}
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
