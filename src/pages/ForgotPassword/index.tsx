import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoSenai.png';

import {
  Container,
  Content,
  LogoContent,
  TextArea,
  Background,
  ButtonContent,
} from './styles';
import { InputLine } from '../../components/Forms/InputLine';
import { Button } from '../../components/Forms/Buttons/Button';
import getValidationErros from '../../utils/getValidationErrors';
import BackButton from '../../components/Forms/Buttons/BackButton';
import { theme } from '../../global/styles/styles';

interface SingInFormData{
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(async (data: SingInFormData) => {
    setLoading(true);
    try {
      // aplica os erros ao component se houver
      formRef.current?.setErrors({});

      // cria o esquema de validação de dados
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      // verifica a validação do esquema criado
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      // se o erro for uma instancia de validação
      if (err instanceof Yup.ValidationError) {
        // se houver erros na validação aplica os mesmo na tela
        const erros = getValidationErros(err);

        // salva os erros no formulario
        formRef.current?.setErrors(erros);

        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Content>
        <BackButton
          position="absolute"
          label="Voltar"
          handleBack={() => navigate(-1)}
          color={theme.colors.primary50}
        />
        <LogoContent>
          <img src={Logo} alt="Logo Senai" width="415px" />
        </LogoContent>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <TextArea>
            <h1>Você esqueceu sua senha?</h1>
            <h2>
              Digite abaixo o email que você utiliza para acessar a conta
              e nós enviaremos um link para cadastro de uma nova senha.
            </h2>
          </TextArea>
          <InputLine name="email" label="Email" />

          <ButtonContent>
            <Button type="submit" width="50%" loading={loading} minHeight="56px">enviar</Button>
          </ButtonContent>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
