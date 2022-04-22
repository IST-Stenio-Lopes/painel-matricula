import { FormHandles } from '@unform/core';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { Button } from '../../../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../../components/Forms/InputLine';
import { InputTags, ITag } from '../../../../../../components/Forms/InputTags';
import TextAreaLine from '../../../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../../../components/Panels/ContentPanel';
import api from '../../../../../../services/api';

import { Container, FormContent } from './styles';

const EmailPanel: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [studentName, setStudentName] = useState<string>();

  const initialValue = useMemo(() => ({
    subject: 'A um passo de concluir sua matrícula*',
    header: 'Parabéns, [Nome do aluno]!\n\nVocê realizou sua pré-matrícula no curso [Curso]  no turno [Turno] , unidade [Unidade], e está a um passo de concluir sua matrícula. \n\nSua vaga ficará reservada por [Dias] dias úteis. Para concluir a matrícula é necessário que você compareça a unidade [Unidade] para apresentar os seguintes documentos originais:',
    documents: [
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
    body: 'Quer tornar seu atendimento presencial mais rápido? \n\nResponda este e-mail, anexe as cópias dos documentos citados anteriormente. E no ato do atendimento, verificaremos os documentos originais. \n\nPara menores de 18 anos, o responsável legal também deverá comparecer munido de seu documento de identificação:',
    legal_documents: [
      {
        id: 'RG ou CNH',
        text: 'RG ou CNH',
      },
    ],
  }), []);

  const [documents, setDocuments] = useState<ITag[]>(initialValue.documents);
  const [legalDocuments, setLegalDocuments] = useState<ITag[]>(initialValue.legal_documents);

  const url = useMemo(() => `http://192.168.1.191:2223/school/dashboard/email/template?student_name=${studentName}&user_id=120ae463-b7d1-4c79-b304-e39f8d44917e&school_id=682fcad2-2c33-4788-aafa-7751a3915f30&student_id=abfa6e84-545a-4a0d-a049-7976d789650d&course_id=da83fc94-fede-47b3-b738-cd5fe930d0ad&classroom_id=ca49c004-3f7f-4f3b-a982-c010841f2af0`, [studentName]);
  return (
    <Container>
      <ContentPanel
        title="Email"
        subTitle="Esse texto será encaminhado para o aluno via email"
        footerContent={<Button maxWidth="150px" minHeight="44px">salvar</Button>}
      >
        <FormContent ref={formRef} onSubmit={() => {}} initialData={initialValue}>
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
              name="documents"
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
            <iframe title="Preview" src={url} />
          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default EmailPanel;
