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
import { validateCPF, validateEmail, validatePhone } from 'validations-br';
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
  IUser, roleOptions, userPermissions, UserRoles,
} from '../../../../../interfaces/IUser';

import {
  Container, FormContent,
} from './styles';
import { removeMask, telMasked } from '../../../../../utils/masks';
import { useRoles } from '../../../../../hooks/roles';

const FormUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location: any = useLocation();
  const { configModal, handleVisible } = useModal();
  const { updateUserRoles, getRole } = useRoles();
  const [showSchoolList, setShowSchoolList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSearchStudent, setLoadingSearchStudent] = useState(false);
  const [email, setEmail] = useState<string>();
  const [file, setFile] = useState<any>();
  const [responseSchoolsList, setResponseSchoolsList] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<number>();
  const [permissionValue, setPermissionValue] = useState<number>(0);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const { user, updateUser } = useAuth();

  const schoolsList = useMemo(() => responseSchoolsList.map((item: any) => (
    {
      value: item.school_id,
      label: item.name,
    })), [responseSchoolsList]);

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

  const createUser = useCallback(async (data) => {
    const {
      name, registration_number,
      cpf, cell_phone,
    } = data;

    const role_name = roleOptions.find(({ value }) => value === selectedRole)?.label;

    const schools = responseSchoolsList.filter((
      { school_id },
    ) => selectedSchool.includes(school_id))
      .map((school) => (
        {
          school_id: school.school_id,
          school_name: school.name,
          role_name,
          role: permissionValue,
        }
      ));

    console.dir({
      schools,
      name,
      registration_number,
      cpf: removeMask(cpf),
      cell_phone: removeMask(cell_phone),
      role_name,
      role: permissionValue,
      email,
    });

    await api.post('/users/dashboard', {
      schools,
      name,
      registration_number,
      cpf: removeMask(cpf),
      cell_phone: removeMask(cell_phone),
      role_name,
      role: permissionValue,
      email,
    }).then((response) => console.dir(response));
  }, [email, permissionValue, responseSchoolsList, selectedRole, selectedSchool]);

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
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        registration_number: Yup.string()
          .required('Matrícula obrigatória'),

        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        cell_phone: Yup.string()
          .test(
            'is-phone',
            'Telefone inválido',
            (value) => validatePhone(value as string),
          )
          .required('Telefone obrigatório'),
        cpf: Yup.string()
          .test(
            'is-cpf',
            'CPF inválido',
            (value) => validateCPF(value as string),
          )
          .required('CPF obrigatório'),

        role_name: Yup.string()
          .test('has-role_name', 'Nível obrigatório', () => !!selectedRole),

        schools: Yup.mixed()
          .test('has-schools', 'Escola obrigatória', () => {
            if (showSchoolList) {
              return (selectedSchool ? selectedSchool?.length > 0 : false);
            }

            return true;
          }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await createUser(data);
      // if (currentUser) await updateCurrentUser(data);
      // else await createUser(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [selectedRole, currentUser, updateCurrentUser, createUser, selectedSchool, showSchoolList]);

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
      setResponseSchoolsList(response.data);
    });
  }, []);

  const searchUser = useCallback(async (data) => {
    setLoadingSearchStudent(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .test(
            'is-email',
            'Email inválido',
            () => validateEmail(email as string),
          ),
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
            `O Email digitado pertence à ${response.data.name} , deseja carrega suas informações?`,
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

  useEffect(() => {
    updateUserRoles(user.role);
    setShowSchoolList(getRole(UserRoles.Desenvolvedor));
  }, [getRole, updateUserRoles, user]);

  return (
    <Container>
      <UserInfo
        user={currentUser || {} as IUser}
        handleChangePhoto={handleAvatarChange}
        img={file}
      />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                loading={loadingSearchStudent}
                styleType="outline"
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

            {showSchoolList && (
              <SelectLine
                name="schools"
                label="Escola SENAI"
                isMulti
                isSearchable
                options={schoolsList}
                value={schoolsList.filter(({ value }) => selectedSchool?.includes(value))}
                onChange={(event: any) => {
                  setSelectedSchool([...event.map(({ value }: any) => value)]);
                }}
              />
            )}

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
