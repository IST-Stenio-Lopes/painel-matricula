export interface IDocument {
  id: string,
  name: string,
  type: string,
  file_name: string,
  created_at: string
}

export interface IStudent {
  id?: string,
  schools_ids?: string[],
  enrollment_ids?: string[],
  enrollment_historic_ids?: string[],
  documents?: IDocument[],
  name: string,
  legal_responsible: string,
  birth_date: Date,
  gender: string,
  naturalness: string,
  disability: string,
  race: string,
  marital_status: string,
  conduct: string,
  schooling: string,
  school_type: string,
  occupation: string,
  cpf: string,
  culture: string,
  rg: string,
  issuing_document: string,
  cellphone: string,
  whatsapp: string,
  email: string,
  cep: string,
  city: string,
  estate: string,
  street: string,
  number: string,
  neighborhood: string,
  address_complement: string,
  edition_log?: string[],
  avatar?: string,
  status?: string,
  updated_at?: string,
  created_at?: string
}

export interface IPartner {
  id: string,
  school_id: string,
  name: string,
  cellphone: string,
  cnpj: string,
  email: string,
  status: string,
  updated_at: string,
  created_at: string
}

export interface IEnrollment{
  id: string,
  object_id: string,
  student: IStudent,
  classroom_id: string,
  course_id: string,
  course_name: string,
  course_cost: string,
  classroom_code: string,
  classroom_is_free: boolean,
  classroom_begin_date: Date | string,
  classroom_shift: string[],
  classroom_shift_formatted: string,
  classroom_month: string,
  classroom_year: string,
  student_partner: IPartner,
  payed_method: string,
  payment_value: 0,
  status: string,
  registered_in_sge: boolean,
}