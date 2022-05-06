import { FormHandles } from '@unform/core';
import React, {
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateCNPJ } from 'validations-br';
import { Button } from '../../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../components/Forms/InputLine';
import ContentPanel from '../../../../../components/Panels/ContentPanel';

import {
  Container, FormContent,
} from './styles';
import getValidationErros from '../../../../../utils/getValidationErrors';
import api from '../../../../../services/api';
import { useModal } from '../../../../../hooks/modal';
import { IPartner } from '../../../../../interfaces/IPartner';
import {
  cpnjMasked, phoneRegExp, removeMask, telMasked,
} from '../../../../../utils/masks';

const FormPartner: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [currentPartner, setCurrentPartner] = useState<IPartner | undefined>(undefined);
  const location: any = useLocation();

  const configPartner = useCallback((partner: IPartner) => {
    const temp: IPartner = {
      ...partner,
      cellphone: telMasked(partner.cellphone),
      cnpj: cpnjMasked(partner.cnpj),
    };

    setCurrentPartner(temp);
  }, []);
  const createPartner = useCallback(async (data: IPartner) => {
    await api.post('/partner/dashboard', {
      name: data.name,
      email: data.email,
      cellphone: removeMask(data.cellphone),
      cnpj: removeMask(data.cnpj),
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        navigate(-1);
      }
    });
  }, [configModal, handleVisible, navigate]);

  const updatePartner = useCallback(async (data: IPartner) => {
    await api.put(`/partner/dashboard/${currentPartner?.id}`, {
      name: data.name,
      email: data.email,
      cellphone: removeMask(data.cellphone),
      cnpj: removeMask(data.cnpj),
    }).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('Atualizado com sucesso', 'success');
        handleVisible();
        navigate(-1);
      }
    });
  }, [configModal, currentPartner?.id, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        email: Yup.string().email('Email inválido')
          .required('Email obrigatório'),
        cellphone: Yup.string().matches(phoneRegExp, 'Digite um Telefone válido')
          .required('Telefone obrigatório'),
        cnpj: Yup.string()
          .test(
            'is-cpf',
            'Digite um CNPJ válido',
            (value) => validateCNPJ(value as string),
          )
          .required('CNPJ obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (currentPartner) await updatePartner(data);
      else await createPartner(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [createPartner, currentPartner, updatePartner]);

  const getCurrentPartner = useCallback(async () => {
    await api.get(`/partner/dashboard/specific/${location.state?.partner.object_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configPartner(response.data);
      } else {
        setCurrentPartner(undefined);
      }
    });
  }, [configModal, handleVisible, location.state?.partner, configPartner]);

  useEffect(() => {
    if (location.state?.partner) {
      getCurrentPartner();
    } else setCurrentPartner(undefined);

    formRef.current?.setErrors({});

    return () => {
      setCurrentPartner(undefined);
    };
  }, [getCurrentPartner, location.state?.partner]);

  return (
    <Container>
      <ContentPanel
        title="Dados do Parceiro"
        subTitle="Informações referentes ao parceiro da escola SENAI"
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
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit} initialData={currentPartner}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="name"
              label="Nome"
            />
            <InputLine
              mask="cnpj"
              name="cnpj"
              label="CNPJ"
            />
            <InputLine
              mask="tel"
              name="cellphone"
              label="Telefone"
            />
            <InputLine
              name="email"
              label="Email"
            />

          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormPartner;
