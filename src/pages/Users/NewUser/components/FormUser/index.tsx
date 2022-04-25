/* eslint-disable no-bitwise */
import { FormHandles } from '@unform/core';
import is from 'date-fns/esm/locale/is/index.js';
import React, {
  ChangeEvent,
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../../../../components/Forms/Buttons/Button';
import LinkButton from '../../../../../components/Forms/Buttons/LinkButton';
import { FormSection } from '../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../components/Forms/InputLine';
import { InputSection } from '../../../../../components/Forms/InputSection';
import SelectLine from '../../../../../components/Forms/SelectLine';
import ContentPanel from '../../../../../components/Panels/ContentPanel';
import UserInfo from '../../../../../components/UserInfo';
import { IUser, useAuth } from '../../../../../hooks/auth';
import { useModal } from '../../../../../hooks/modal';
import api from '../../../../../services/api';
import getValidationErros from '../../../../../utils/getValidationErrors';
import PermissionSection from '../PermissionSection';
import { UserRoles } from '../../../../../interfaces/IUser';

import {
  Container, FormContent,
} from './styles';

const userPermissions = [
  {
    title: 'Usuários',
    allPermissions: { name: 'Usuários', role: UserRoles.Gerir_Usuarios },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Usuarios },
      { name: 'Editar', role: UserRoles.Editar_Usuarios },
      { name: 'Remover', role: UserRoles.Remover_Usuarios },
    ],
  },
  {
    title: 'Anúncios',
    allPermissions: { name: 'Anúncios', role: UserRoles.Gerir_Propagandas },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Anuncios },
      { name: 'Editar', role: UserRoles.Editar_Anuncios },
      { name: 'Remover', role: UserRoles.Remover_Anuncios },
    ],
  },
  {
    title: 'Descontos',
    allPermissions: { name: 'Descontos', role: UserRoles.Gerir_Propagandas },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Descontos },
      { name: 'Editar', role: UserRoles.Editar_Descontos },
      { name: 'Remover', role: UserRoles.Remover_Descontos },
    ],
  },
  {
    title: 'Turmas',
    allPermissions: { name: 'Turmas', role: UserRoles.Gerir_Usuarios },
    permissions: [
      { name: 'Iniciar', role: UserRoles.Iniciar_Turmas },
      { name: 'Criar', role: UserRoles.Criar_Turmas },
      { name: 'Editar', role: UserRoles.Editar_Turmas },
      { name: 'Remover', role: UserRoles.Remover_Turmas },
    ],
  },
  {
    title: 'Cursos',
    allPermissions: { name: 'Cursos', role: UserRoles.Gerir_Cursos },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Cursos },
      { name: 'Editar', role: UserRoles.Editar_Cursos },
      { name: 'Remover', role: UserRoles.Remover_Descontos },
    ],
  },
  {
    title: 'Matrículas',
    allPermissions: { name: 'Matrículas', role: UserRoles.Gerir_Matriculas },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Matriculas },
      { name: 'Editar', role: UserRoles.Editar_Matriculas },
      { name: 'Remover', role: UserRoles.Remover_Matriculas },
    ],
  },
  {
    title: 'Parceiros',
    allPermissions: { name: 'Parceiros', role: UserRoles.Gerir_Parceiros },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Parceiros },
      { name: 'Editar', role: UserRoles.Editar_Parceiros },
      { name: 'Remover', role: UserRoles.Remover_Parceiros },
    ],
  },
  {
    title: 'Localizações',
    allPermissions: { name: 'Localizações', role: UserRoles.Editar_Localizacao | UserRoles.Listar_Localizacoes },
    permissions: [
      { name: 'Visualizar', role: UserRoles.Listar_Localizacoes },
      { name: 'Editar', role: UserRoles.Editar_Localizacao },
    ],
  },
];

const roleOptions = [
  {
    value: '', label: '',
  },
];

const FormUser: React.FC = () => {
  const location: any = useLocation();
  const formRef = useRef<FormHandles>(null);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const { configModal, handleVisible } = useModal();

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const { user, updateUser } = useAuth();

  const handleChangeName = useCallback((e) => {
    const temp = { ...currentUser as IUser };

    temp.name = e.target.value;
    setCurrentUser(temp);
  }, [currentUser]);

  useEffect(() => {
    if (location.state?.newUser) setCurrentUser(undefined);
    else if (location.state?.user) setCurrentUser(location.state.user);
    else setCurrentUser(user);

    formRef.current?.setErrors({});
  }, [location.state, user]);

  const createUser = useCallback(async (data) => {}, []);

  const updateCurrentUser = useCallback(async (data) => {
    await api.put(`/users/dashboard/${currentUser?.id}`, {
      name: data.name,
    }).catch((err: any) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response: any) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        console.log('sucesso');
      }
    });
  }, [configModal, currentUser?.id, handleVisible]);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.lazy(() => {
          if (currentUser) {
            return Yup.string()
              .required('Nome obrigatório');
          }

          return Yup.mixed().notRequired();
        }),
        registration_number: Yup.lazy(() => {
          if (currentUser) {
            return Yup.string()
              .required('Matrícula obrigatória');
          }

          return Yup.mixed().notRequired();
        }),

        email: Yup.lazy(() => {
          if (currentUser) {
            return Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido');
          }

          return Yup.mixed().notRequired();
        }),

        current_password: Yup.lazy(() => {
          if (showEditPassword) {
            return Yup.string()
              .required('Senha atual obrigatória');
          }

          return Yup.mixed().notRequired();
        }),

        password: Yup.lazy(() => {
          if (!currentUser) {
            return Yup.string()
              .required('Senha obrigatória');
          }

          return Yup.mixed().notRequired();
        }),
        password_confirmation: Yup.lazy(() => {
          if (!currentUser) {
            return Yup.string()
              .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.');
          }

          return Yup.mixed().notRequired();
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (currentUser) await updateCurrentUser(data);
      else await createUser(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    }
  }, [createUser, currentUser, showEditPassword, updateCurrentUser]);

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      await api.patch('/users/dashboard/profile/avatar', data).then(async () => {
        await api.get(`/users/dashboard/profile/${currentUser?.id}`).then((res) => {
          updateUser({ ...res.data, school_id: currentUser?.school_id });
        });
      });
    }
  }, [currentUser?.id, currentUser?.school_id, updateUser]);

  return (
    <Container>
      <UserInfo user={currentUser} handleChangePhoto={handleAvatarChange} />
      <ContentPanel
        gridColumn="2 / 4"
        title="Informações Pessoais"
        subTitle="Preencha as informações e os dados de acesso"
        footerContent={(
          <Button
            onClick={() => formRef.current?.submitForm()}
            maxWidth="150px"
            minHeight="44px"
          >
            salvar
          </Button>
      )}
      >
        <FormContent
          ref={formRef}
          initialData={currentUser}
          onSubmit={handleSubmit}
        >
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="email"
              label="Email"
            />
            <InputLine
              name="name"
              label="Nome"
              onChange={handleChangeName}
            />
            <InputLine
              mask="cpf"
              name="cpf"
              label="CPF"
            />
            <InputSection grid_template_column="1fr 1fr">
              <InputLine
                mask="numeric"
                name="registration_number"
                label="Matrícula"
              />

              <InputLine
                mask="tel"
                name="cellphone"
                label="Telefone"
              />
            </InputSection>

            <SelectLine
              name="role_name"
              label="Nível de acesso"
            />

            <InputLine
              name="password"
              label="Senha"
            />
            <InputLine
              name="confirm_password"
              label="Confirmar Senha"
            />
          </FormSection>
          <FormSection gridColumn="2 / 3">
            <h3>Permissões</h3>
            {
              userPermissions.map(({ title, allPermissions, permissions }) => (
                <PermissionSection
                  title={title}
                  allPermissions={allPermissions}
                  permissions={permissions}
                />
              ))
            }
          </FormSection>

        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormUser;
