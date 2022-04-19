import React, { useMemo } from 'react';
import { IClassroomDetails } from '../../../../interfaces/IClassroom';

import {
  Container, Title, BarContent, BackBar, MiddleBar, ForeBar, TextArea,
} from './styles';

interface ClassroomInfoProps {
  classroomDetails: IClassroomDetails
}

const ClassroomInfo: React.FC<ClassroomInfoProps> = ({ classroomDetails }) => {
  const heldPercent = useMemo(() => {
    const total = classroomDetails.classroom.number_of_vacancies;
    const current = classroomDetails.enrollment_held;

    return (current * 100) / total;
  }, [classroomDetails]);

  const reservedPercent = useMemo(() => {
    const total = classroomDetails.classroom.number_of_vacancies;
    const current = classroomDetails.enrollment_reserved;

    return (current * 100) / total;
  }, [classroomDetails]);

  return (
    <Container>
      <Title>{classroomDetails.classroom.course.name}</Title>
      <BarContent>
        <BackBar />
        <MiddleBar width={heldPercent + reservedPercent} />
        <ForeBar width={heldPercent} />
      </BarContent>
      <TextArea>
        <h2>{`Matriculados: ${classroomDetails.enrollment_held}`}</h2>
        <h2>{`Reservados: ${classroomDetails.enrollment_reserved}`}</h2>
        <h2>{`Vagas disponíveis: ${classroomDetails.vacancies_available}`}</h2>
        <h2>{`Lista de espera: ${classroomDetails.enrollment_waiting}`}</h2>
        <h2>{`Expirados: ${classroomDetails.enrollment_expired}`}</h2>
      </TextArea>
    </Container>
  );
};

export default ClassroomInfo;
