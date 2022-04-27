/* eslint-disable no-bitwise */
import { FormHandles } from '@unform/core';
import React, {
  ChangeEvent,
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { MdOutlineSearch } from 'react-icons/md';
import { Button } from '../../../../../components/Forms/Buttons/Button';
import { FormSection } from '../../../../../components/Forms/FormSection';
import { InputLine } from '../../../../../components/Forms/InputLine';
import { InputSection } from '../../../../../components/Forms/InputSection';
import SelectLine from '../../../../../components/Forms/SelectLine';
import ContentPanel from '../../../../../components/Panels/ContentPanel';
import UserInfo from '../../../../../components/UserInfo';
import { useAuth } from '../../../../../hooks/auth';
import { useModal } from '../../../../../hooks/modal';
import api from '../../../../../services/api';
import getValidationErros from '../../../../../utils/getValidationErrors';
import PermissionSection from '../PermissionSection';
import {
  IUser, roleOptions, userPermissions,
} from '../../../../../interfaces/IUser';

import {
  Container, FormContent,
} from './styles';
import { telMasked } from '../../../../../utils/masks';

const FormUser: React.FC = () => {
  const { configModal, handleVisible } = useModal();
  const location: any = useLocation();
  const [loadingSearchStudent, setLoadingSearchStudent] = useState(false);
  const [email, setCpf] = useState<string>();

  const formRef = useRef<FormHandles>(null);
  const [file, setFile] = useState<any>();
  const [schoolsList, setSchoolsList] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState<string>();
  const [selectedRole, setSelectedRole] = useState<number>();
  const [permissionValue, setPermissionValue] = useState<number>(0);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const { user, updateUser } = useAuth();

  const configUser = useCallback((value: IUser) => {
    const temp = {
      ...value,
      email: value.email,
      cell_phone: telMasked(value.cell_phone),
    } as IUser;
    setCurrentUser(temp);
    setSelectedRole(roleOptions.find((role) => role.label === temp.role_name)?.value);
    setPermissionValue(roleOptions.find((role) => role.label === temp.role_name)?.value || 0);
  }, []);

  const handleChangeName = useCallback((e) => {
    const temp = { ...currentUser as IUser };

    temp.name = e.target.value;
    setCurrentUser(temp);
  }, [currentUser]);

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
    console.log('submit', selectedRole, permissionValue);

    // try {
    //   formRef.current?.setErrors({});

    //   const schema = Yup.object().shape({
    //     name: Yup.lazy(() => {
    //       if (currentUser) {
    //         return Yup.string()
    //           .required('Nome obrigatório');
    //       }

    //       return Yup.mixed().notRequired();
    //     }),
    //     registration_number: Yup.lazy(() => {
    //       if (currentUser) {
    //         return Yup.string()
    //           .required('Matrícula obrigatória');
    //       }

    //       return Yup.mixed().notRequired();
    //     }),

    //     email: Yup.lazy(() => {
    //       if (currentUser) {
    //         return Yup.string()
    //           .required('E-mail obrigatório')
    //           .email('Digite um e-mail válido');
    //       }

    //       return Yup.mixed().notRequired();
    //     }),

    //     current_password: Yup.lazy(() => {
    //       if (showEditPassword) {
    //         return Yup.string()
    //           .required('Senha atual obrigatória');
    //       }

    //       return Yup.mixed().notRequired();
    //     }),

    //     password: Yup.lazy(() => {
    //       if (!currentUser) {
    //         return Yup.string()
    //           .required('Senha obrigatória');
    //       }

    //       return Yup.mixed().notRequired();
    //     }),
    //     password_confirmation: Yup.lazy(() => {
    //       if (!currentUser) {
    //         return Yup.string()
    //           .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.');
    //       }

    //       return Yup.mixed().notRequired();
    //     }),
    //   });

    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });

    //   if (currentUser) await updateCurrentUser(data);
    //   else await createUser(data);
    // } catch (err) {
    //   if (err instanceof Yup.ValidationError) {
    //     const erros = getValidationErros(err);

    //     formRef.current?.setErrors(erros);
    //   }
    // }
  }, [createUser, currentUser, showEditPassword, updateCurrentUser, selectedRole, permissionValue]);

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    // if (e.target.files) {
    //   const data = new FormData();

    //   data.append('avatar', e.target.files[0]);

    //   await api.patch('/users/dashboard/profile/avatar', data).then(async () => {
    //     await api.get(`/users/dashboard/profile/${currentUser?.id}`).then((res) => {
    //       updateUser({ ...res.data, school_id: currentUser?.school_id });
    //     });
    //   });
    // }
  }, [currentUser?.id, currentUser?.school_id, updateUser]);

  const getCurrentUser = useCallback(async () => {
    await api.get(`/users/dashboard/specific/id/${location.state?.user.object_id}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configUser(response.data);
      } else {
        setCurrentUser(undefined);
      }
    });
  }, [configModal, configUser, handleVisible, location.state?.user.object_id]);

  const getSchoolsList = useCallback(async () => {
    await api.get('/users/dashboard/school/list').catch((err) => console.dir(err)).then((response: any) => {
      setSchoolsList(response.data.map((item: any) => (
        {
          value: item.school_id,
          label: item.name,
        })));
    });
  }, []);

  const searchUser = useCallback(async (data) => {
    setLoadingSearchStudent(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Email obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.get(`/users/dashboard/specific/email/${email}`).catch((err) => {
        configModal(err.response.data.message, 'error');
        handleVisible();
      }).then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          configModal(
            `O CPF digitado pertence à ${response.data.name} , deseja carrega suas informações?`,
            'message',
            true,
            false,
            () => { configUser(response.data); },
          );
          handleVisible();
        }
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoadingSearchStudent(false);
    }
  }, [configModal, email, handleVisible, configUser]);

  useEffect(() => {
    getSchoolsList();

    if (location.state?.newUser) {
      setCurrentUser(undefined);
    } else if (location.state?.user) getCurrentUser();

    formRef.current?.setErrors({});
  }, [configUser, getCurrentUser, location.state, user, getSchoolsList]);

  return (
    <Container>
      <UserInfo user={currentUser} handleChangePhoto={handleAvatarChange} img={file} />
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
            <InputSection grid_template_column="1fr auto">
              <InputLine
                name="email"
                label="Email"
              />

              <Button
                loading={loadingSearchStudent}
                styleType="outline"
                gridColumn="2 / 3"
                gridRow="4 / 4"
                width="58px"
                maxHeight="34px"
                iconWithMargin={false}
                onClick={() => searchUser(formRef.current?.getData())}
              >
                <MdOutlineSearch size={24} />
              </Button>
            </InputSection>

            <InputLine
              name="name"
              label="Nome"
              onChange={handleChangeName}
            />
            <InputLine
              mask="cpf"
              name="email"
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
                name="cell_phone"
                label="Telefone"
              />
            </InputSection>

            <SelectLine
              name="role_name"
              label="Nível de acesso"
              options={roleOptions}
              value={roleOptions.filter((item) => item.value === selectedRole)}
              onChange={(newValue: any) => {
                setPermissionValue(newValue.value as number);
                setSelectedRole(newValue.value as number);
              }}
            />

            <SelectLine
              name="schools"
              label="Escola SENAI"
              options={schoolsList}
              value={schoolsList.filter((item: any) => item.value === selectedSchool)}
              onChange={(newValue: any) => setSelectedSchool(newValue.value as string)}
            />

          </FormSection>
          <FormSection gridColumn="2 / 3">
            <h3>PERMISSÕES DO USUÁRIO</h3>
            {
              userPermissions.map(({ title, allPermissions, permissions }) => (
                <PermissionSection
                  key={title}
                  title={title}
                  allPermissions={allPermissions}
                  permissions={permissions}
                  userRole={selectedRole}
                  permissionValue={permissionValue}
                  setPermissionValue={setPermissionValue}
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
