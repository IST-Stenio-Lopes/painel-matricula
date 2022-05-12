import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { MdAttachFile } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../components/Forms/Buttons/Button';
import MenuSelect from '../../../../components/MenuSelect';
import SelectMenuButton from '../../../../components/MenuSelect/components/SelectMenuButton';
import UserInfo from '../../../../components/UserInfo';
import { useEnrollment } from '../../../../hooks/enrollment';
import { useModal } from '../../../../hooks/modal';
import { useStudent } from '../../../../hooks/student';
import api from '../../../../services/api';
import { removeMask } from '../../../../utils/masks';
import AttachmentsPanel from './components/AttachmentsPanel';
import EnrollmentsPanel from './components/EnrollmentsPanel';
import StudentPanel from './components/StudentPanel';
import { IStudent } from './data/types';

import { Container, Content } from './styles';

const buttonsMenu = [
  'Dados do Aluno',
  'Matrícula',
  'Anexos',
];

const FormEnrollment: React.FC = () => {
  const location: any = useLocation();
  const { setCurrentStudent, currentStudent, setIsEditing } = useStudent();
  const { configModal, handleVisible } = useModal();
  const {
    setCurrentEnrollment,
    currentEnrollment,
    setIsEditing: setIsEditingEnrollment,
  } = useEnrollment();
  const [file, setFile] = useState<any>();
  const [studentName, setStudentName] = useState('Nome');
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(buttonsMenu[0]);
  const [stage, setStage] = useState(0);

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleCancelEnrollment = useCallback(() => {
    setCurrentEnrollment(undefined);
  }, [setCurrentEnrollment]);

  const nextStage = useCallback((value: number) => {
    if (stage >= 2) return;

    setStage(value);
    buttonsMenu[value];
  }, [stage]);

  const getStudent = useCallback(async (cpf) => {
    await api.get(`/student/dashboard/search/${removeMask(cpf as string)}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentStudent(response.data);
        nextStage(1);
      }
    });
  }, [configModal, handleVisible, setCurrentStudent, nextStage]);

  const renderPanel = useCallback(() => {
    switch (selectedMenu) {
      case 'Dados do Aluno':
        return (
          <StudentPanel
            avatar={file}
            handleChangeName={setStudentName}
            setCurrentStudent={setCurrentStudent}
            student={currentStudent}
            nextStage={nextStage}
            getStudent={getStudent}
          />
        );
      case 'Matrícula':
        return (
          <EnrollmentsPanel
            enrollment={currentEnrollment}
            student={currentStudent as IStudent}
            setEnrollment={setCurrentEnrollment}
            handleCancel={() => handleCancelEnrollment()}
            nextStage={nextStage}
          />
        );
      default:
        return (
          <AttachmentsPanel
            showAttachmentModal={showAttachmentModal}
            handleCloseModal={() => setShowAttachmentModal(false)}
            student_id={currentStudent?.id}
            enrollment_id={currentEnrollment?.id}
          />
        );
    }
  }, [selectedMenu, file, currentStudent, nextStage, getStudent,
    currentEnrollment, setCurrentEnrollment, showAttachmentModal,
    handleCancelEnrollment, setCurrentStudent]);

  const getCurrentEnrollment = useCallback(async () => {
    await api.get(`/enrollment/dashboard/specific/${location.state?.enrollment.object_id}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentEnrollment(response.data);
        setCurrentStudent(response.data.student);
        setStudentName(response.data.student.name);
        setIsEditing(true);
      } else {
        setCurrentEnrollment(undefined);
        setCurrentStudent(undefined);
        setIsEditing(false);
        setIsEditingEnrollment(false);
      }
    });
  }, [
    configModal,
    handleVisible,
    location.state?.enrollment.object_id,
    setCurrentEnrollment,
    setCurrentStudent,
    setIsEditing,
    setIsEditingEnrollment]);

  useEffect(() => {
    if (location.state?.enrollment) {
      getCurrentEnrollment();
    } else setCurrentEnrollment(undefined);

    // return () => {
    //   setCurrentEnrollment(undefined);
    //   setCurrentStudent(undefined);
    //   setIsEditing(false);
    //   setIsEditingEnrollment(false);
    // };
  }, [
    getCurrentEnrollment,
    location.state?.enrollment,
    setCurrentEnrollment,
    setCurrentStudent,
    setIsEditing,
    setIsEditingEnrollment]);

  return (
    <Container>
      <Content>
        <MenuSelect>
          {buttonsMenu.map((name, index) => (
            <SelectMenuButton
              key={name}
              name={name}
              selectedMenu={selectedMenu}
              handleSelect={setSelectedMenu}
              disabled={!currentEnrollment && index > stage}
            />
          ))}
        </MenuSelect>
        <UserInfo
          img={file}
          name={studentName}
          student={currentStudent}
          handleChangePhoto={handleAvatarChange}
        />

        {selectedMenu === 'Anexos' && (
        <Button
          styleType="outline"
          gridColumn="1 / 1"
          minHeight="44px"
          leftIcon={<MdAttachFile size={18} />}
          onClick={() => setShowAttachmentModal(!showAttachmentModal)}
        >
          Anexar Arquivo
        </Button>
        )}
      </Content>
      {renderPanel()}
    </Container>
  );
};

export default FormEnrollment;
