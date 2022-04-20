export interface AdvertisingResponse {
  id: String,
  title: string,
  type: string,
  number_visualizations: string,
  expiration_date: Date,
  description: string,
  status: string
}

export interface IAdvertising {
  object_id: string,
  course_id: string,
  title: string,
  expiration_date: Date,
  type: string,
  discount_percentage: number,
  description: string,
  number_visualizations: number,
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
