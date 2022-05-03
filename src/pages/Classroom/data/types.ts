import { ICourse } from '../../../interfaces/ICourse';
import { IPartner } from '../../Enrollment/NewEnrollment/FormEnrollment/data/types';

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
