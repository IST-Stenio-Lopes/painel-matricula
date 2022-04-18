import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

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
  ActionContent,
  ButtonContent,
} from './styles';
import { InputLine } from '../../components/Forms/InputLine';
import { Button } from '../../components/Forms/Buttons/Button';
import { useAuth } from '../../hooks/auth';
import getValidationErros from '../../utils/getValidationErrors';
import Checkbox from '../../components/Forms/Checkbox';
import LinkButton from '../../components/Forms/Buttons/LinkButton';
import SelectLine from '../../components/Forms/SelectLine';
import { theme } from '../../global/styles/styles';
import BackButton from '../../components/Forms/Buttons/BackButton';
import api from '../../services/api';

interface SessionInFormData{
  email: string;
  password: string;
}

interface SessionState {
  request_token: string;
  schools: SchoolListProps[]
}

interface SchoolListProps {
  school_id: string,
  name: string
}

const SignIn: React.FC = () => {
  const [sessionState, setSessionState] = useState({} as SessionState);
  const [selectSchool, setSelectSchool] = useState(false);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const formRefSelectSchool = useRef<FormHandles>(null);
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const schoolsOptions = useMemo(() => sessionState.schools && sessionState.schools.map(({
    school_id,
    name,
  }) => ({ value: school_id, label: name })), [sessionState]);

  const handleSchoolChange = useCallback((inputValue) => {
    setSchoolId(inputValue.value);
  }, [setSchoolId]);

  const handleSelectSchool = useCallback(async () => {
    setLoading(true);
    try {
      formRefSelectSchool.current?.setErrors({});

      if (schoolId) {
        await signIn({
          request_token: sessionState.request_token,
          school_id: schoolId,
        });

        setSelectSchool(false);
      } else {
        formRefSelectSchool.current?.setErrors({ school_id: 'Escola obrigatória' });
      }
    } finally {
      setLoading(false);
    }
  }, [signIn, schoolId, sessionState]);

  const handleSignIn = useCallback(async (data: SessionInFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      const response = await api.post('/dashboard/lobby', { email, password });

      const { token, schools } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setSessionState({ request_token: token, schools });

      setSelectSchool(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);

        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (schoolsOptions && schoolsOptions.length >= 1) {
      setSchoolId(schoolsOptions[0].value);
    }
  }, [schoolsOptions]);

  return (
    <Container>
      <Content>
        {selectSchool && (
        <BackButton
          position="absolute"
          label="Voltar"
          handleBack={() => setSelectSchool(false)}
          color={theme.colors.primary50}
        />
        )}
        <LogoContent>
          <img src={Logo} alt="Logo Senai" width="415px" />
        </LogoContent>

        {selectSchool
          ? (
            <Form ref={formRefSelectSchool} onSubmit={handleSelectSchool}>
              <TextArea>
                <h1>Selecione a escola que deseja gerir</h1>
              </TextArea>

              <SelectLine
                name="school_id"
                label="Escola SENAI"
                options={schoolsOptions}
                onChange={handleSchoolChange}
              />

              <ButtonContent>
                <Button type="submit" width="50%" loading={loading} minHeight="56px">ENTRAR</Button>
              </ButtonContent>
            </Form>
          )
          : (
            <Form ref={formRef} onSubmit={handleSignIn}>
              <TextArea>
                <h1>Seja bem vindo(a)!</h1>
                <h2>Preencha os campos abaixo para acessar sua conta</h2>
              </TextArea>
              <InputLine name="email" label="Email" />
              <InputLine name="password" label="Senha" type="password" />

              <ActionContent>
                <LinkButton onClick={() => navigate('esqueceu-senha')}>Esqueceu a senha?</LinkButton>
              </ActionContent>

              <ButtonContent>
                <Button type="submit" width="50%" loading={loading} minHeight="56px">ENTRAR</Button>
              </ButtonContent>
            </Form>
          )}

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
