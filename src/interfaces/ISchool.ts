export interface AdvertisingResponse {
  id: String,
  title: string,
  type: string,
  number_visualizations: string,
  expiration_date: Date,
  description: string,
  status: string
}

export interface IEmailType {
  subject: string;
  header: string;
  body: string;
  legal_documents: string[];
  student_documents: string[];
  files: any[];
}

export interface ISchool {
  id: string,
  object_id: string,
  name: string,
  initials: string,
  street: string,
  number: string,
  neighborhood: string,
  zipcode: string,
  city: string,
  estate: string,
  phone: string,
  whatsapp_enabled: true,
  whatsapp_number: string,
  email: string,
  business_hours: string,
  gps_location: string,
  payment_pv: string,
  payment_token: string,
  business_model: string,
  application_deadline: string,
  application_payment_tax: string,
  pre_registration_email: IEmailType,
  application_email: IEmailType,
  lean_office_email: IEmailType,
  free_enrollment_block: true,
  free_enrollment_block_time: string,
  status: string,
  updated_at: string,
  created_at: string
}

export interface ISchoolListResponse {
  id: string,
  name: string,
  initials: string,
  estate: string,
  city: string,
  email: string,
  phone: string,
  status: string,
}

export const typeOptions = [
  { value: 'Anuncio', label: 'Anúncio' },
  { value: 'Desconto', label: 'Desconto' },
];

export enum StatusOfAdvertising
{
  Ativado = 'Ativado',
  Removido = 'Removido',
  Expirado = 'Expirado',
}

export enum EmailTypes {
  Lean = 'new_lean_enrollment',
  Matricula = 'new_enrollment',
  Reservado = 'new_held_enrollment',
}
