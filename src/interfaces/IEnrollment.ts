export interface EnrollmentResponse {
  id: string,
  student_name: string,
  student_cpf: string,
  course_name: string,
  student_cellphone: string,
  student_whatsapp: string,
  student_email: string,
  student_expiration: string,
  status: string,
}

export enum StatusOfEnrollment
{
  Matriculado = 'Matriculado',
  Finalizado = 'Finalizado',
  Reservado = 'Reservado',
  Cancelada = 'Cancelada',
  Cursando = 'Cursando',
  Expirada = 'Expirada',
  Excluido = 'Excluido',
  Espera = 'Espera',

  // Error =[
  Pendente = 'Pendente',

  // Dummy
  Dummy = 'Dummy',
}
