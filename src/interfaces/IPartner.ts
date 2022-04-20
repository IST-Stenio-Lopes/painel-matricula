export interface PartnerResponse {
  id: string,
  name: string,
  cellphone: string,
  cnpj: string,
  email: string
}

export interface IPartner {
  id: string,
  object_id: string,
  name: string,
  cellphone: string,
  cnpj: string,
  email: string
}

export enum StatusOfPartner
{
  Ativado = 'Ativado',
  Removido = 'Removido',
  Excluido = 'Excluído',
}
