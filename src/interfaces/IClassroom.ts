import { ICourse } from '../pages/Courses/NewCourse/components/FormCourse';
import { IPartner } from '../pages/Enrollment/NewEnrollment/FormEnrollment/data/types';

export enum StatusOfClassroom {
  Iniciada = 'Iniciada',
  Aberta = 'Aberta',
  Fechada = 'Fechada',
  Finalizada = 'Finalizada',
  Removido = 'Removido',
  Cancelada = 'Cancelada',
}

export interface IClassroomResponse {
  id: string,
  object_id: string,
  code: string,
  course_name: string,
  category: string,
  shift: string[],
  is_free: string,
  number_of_vacancies: number,
  number_of_enrollments: number,
  status: string
}

export interface IClassroomDetails {
  enrollment_held: number,
  enrollment_reserved: number,
  vacancies_available: number,
  enrollment_waiting: number,
  enrollment_expired: number,
  classroom: IClassroom
}

export interface IClassroom{
  id: string,
  object_id: string,
  school_id: string,
  course_id: string,
  course: ICourse,
  partner_id: string,
  partner: IPartner,
  category: string,
  shift: string[],
  application_deadline: number,
  code: string,
  days_of_presence: string[],
  month: string,
  year: number,
  is_free: boolean,
  number_of_vacancies: number,
  promotional_code: string,
  status: string,
  updated_at: string,
  created_at: string
}
