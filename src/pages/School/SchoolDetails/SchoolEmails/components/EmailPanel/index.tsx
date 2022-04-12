import React from 'react';
import { Button } from '../../../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../../components/Forms/InputLine';
import TextAreaLine from '../../../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../../../components/Panels/ContentPanel';

import { Container, FormContent } from './styles';

const EmailPanel: React.FC = () => (
  <Container>
    <ContentPanel
      title="Email"
      subTitle="Esse texto será encaminhado para o aluno via email"
      footerContent={<Button maxWidth="150px" minHeight="44px">salvar</Button>}
    >
      <FormContent onSubmit={() => {}}>
        <FormSection gridColumn="1 / 2">
          <InputLine
            name="nome"
            label="Nome"
          />

          <TextAreaLine
            name="mensagem"
            label="Texto"
            rows={26}
          />

        </FormSection>
      </FormContent>
    </ContentPanel>
  </Container>
);

export default EmailPanel;
