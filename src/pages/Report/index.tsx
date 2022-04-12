import React from 'react';
import { Button } from '../../components/Forms/Buttons/Button';
import { FormSection } from '../../components/Forms/FormSection';
import { InputSection } from '../../components/Forms/InputSection';
import SelectLine from '../../components/Forms/SelectLine';
import PageContainer from '../../components/PageContainer';
import ContentPanel from '../../components/Panels/ContentPanel';

import { FormContent } from './styles';

const Report: React.FC = () => (
  <PageContainer paddingTop="32px">
    <ContentPanel
      title="Relatório"
      subTitle="Selecione o tipo de relatório que deseja e gere o pdf"
      footerContent={<Button maxWidth="150px" minHeight="44px">confirmar</Button>}
      width="50%"
    >
      <FormContent onSubmit={() => {}}>
        <FormSection gridColumn="1 / 2">
          <SelectLine
            name="tipo"
            label="Tipo"
          />

          <SelectLine
            name="categoria"
            label="Categoria"
          />

          <InputSection grid_template_column="1fr 1fr">
            <SelectLine
              name="de"
              label="De"
            />

            <SelectLine
              name="ate"
              label="Até"
            />
          </InputSection>

        </FormSection>
      </FormContent>
    </ContentPanel>
  </PageContainer>
);

export default Report;
