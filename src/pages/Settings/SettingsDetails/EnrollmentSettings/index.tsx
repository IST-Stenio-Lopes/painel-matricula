import { FormHandles } from '@unform/core';
import React, {
  useCallback, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import CheckboxInput from '../../../../components/Forms/Checkbox';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import SelectLine from '../../../../components/Forms/SelectLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import { useSchool } from '../../../../hooks/school';
import { ISchool } from '../../../../interfaces/ISchool';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';

import {
  Container, FormContent,
} from './styles';

const options = [
  { value: 'dia(s)', label: 'dia(s)' },
  { value: 'semana(a)', label: 'semana(a)' },
  { value: 'mês(es)', label: 'mês(es)' },
  { value: 'ano(s)', label: 'ano(s)' },
];
const EnrollmentSettings: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { currentSchool } = useSchool();
  const { configModal, handleVisible } = useModal();
  const [
    activateGracePeriod,
    setActivateGracePeriod] = useState(!!currentSchool?.free_enrollment_block);

  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(currentSchool ? currentSchool.free_enrollment_block_time.split(' ')[1] : '');

  const updateSchool = useCallback(async (data: ISchool) => {
    await api.put(`/school/dashboard/${currentSchool?.id}`, {
      ...currentSchool,
      application_deadline: data.application_deadline,
      free_enrollment_block: activateGracePeriod,
      free_enrollment_block_time: activateGracePeriod ? `${data.free_enrollment_block_time} ${selectedPeriod}` : undefined,
      application_payment_tax: 0,
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Atualizado com sucesso', 'success');
        handleVisible();
      }
    });
  }, [currentSchool, activateGracePeriod, selectedPeriod, configModal, handleVisible]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        application_deadline: Yup.number()
          .typeError('O valor deve ser maior que 0')
          .test('is-more-than', 'O valor deve ser maior que 0', (value) => +(value as number) >= 1),
        free_enrollment_block_time: Yup.mixed()
          .test('is-more-than', 'O valor deve ser maior que 0', (value) => {
            if (activateGracePeriod) {
              return +(value as number) >= 1;
            } return true;
          }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await updateSchool(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [activateGracePeriod, updateSchool]);

  return (
    <Container>
      <ContentPanel
        title="Configuração de Matrículas"
        subTitle="As informações abaixo afetam as matrículas gratuitas e pré-matrículas"
        width="50%"
        footerContent={(
          <Button
            loading={loading}
            onClick={() => formRef.current?.submitForm()}
            maxWidth="150px"
            minHeight="44px"
          >
            salvar
          </Button>
      )}
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={currentSchool}>
          <FormSection gridColumn="1 / 2">
            <InputSection grid_template_column="50% 50%">
              <InputLine
                mask="numeric"
                name="application_deadline"
                label="Expirar pré-matrícula em: (dias)"
              />
            </InputSection>

            <CheckboxInput
              name="free_enrollment_block"
              label="Ativar tempo de carência para cursos gratuitos"
              defaultChecked={activateGracePeriod}
              onChange={() => setActivateGracePeriod(!activateGracePeriod)}
              contentStyle={{
                marginBottom: 18,
                marginTop: 18,
              }}
            />

            {activateGracePeriod && (
              <InputSection grid_template_column="50% 50%">

                <InputLine
                  disable={!activateGracePeriod}
                  mask="numeric"
                  placeholder="Ex: 3"
                  name="free_enrollment_block_time"
                  label="Tempo de carência"
                />

                <SelectLine
                  disabled={!activateGracePeriod}
                  name="time"
                  label="Período"
                  options={options}
                  value={options.filter((item) => item.value === selectedPeriod)}
                  onChange={(newValue: any) => {
                    setSelectedPeriod(newValue.value);
                  }}
                />
              </InputSection>
            )}

            <h3>
              Ao ativar a função de tempo de carência, o estudante que tenha
              ingressado em um curso gratuito ficará impossibilitado
              de matricular-se em cursos gratuitos até o fim do prazo estipulado
              contado a partir da data de sua matrícula
              <br />
              <br />
              OBS: Mesmo com o tempo de carência ativado, é possível forçar a
              criação de uma matrícula em um curso gratuito.
            </h3>

          </FormSection>

        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default EnrollmentSettings;
