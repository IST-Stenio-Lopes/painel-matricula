import { ITag } from '../components/Forms/InputTags';

export enum StatusOfCourse {
  Ativado = 'Ativado',
  Removido = 'Removido',
  Excluido = 'Excluído',
}

export interface ICourse{
  id: string,
  object_id: string,
  name: string,
  field: string,
  modality: string,
  duration: string,
  cost: number | string,
  payment_installment: number,
  enrollment_fee: number | string,
  description: string,
  prerequisites: string,
  status: string,
  tags: ITag[],
  grade: any[]
}

export interface IGrade {
  id: string;
  title: string | undefined;
  credits: string | undefined;
}

export const fieldOptions = [
  { value: 'Alimentos', label: 'Alimentos' },
  { value: 'Automação Industrial', label: 'Automação Industrial' },
  { value: 'Bolsas e Artefatos', label: 'Bolsas e Artefatos' },
  { value: 'Couros e Calçados', label: 'Couros e Calçados' },
  { value: 'Construção Civil', label: 'Construção Civil' },
  { value: 'Design', label: 'Design' },
  { value: 'Design de Produto', label: 'Design de Produto' },
  { value: 'Energia GTD (Geração, Transmissão e Distribuição)', label: 'Energia GTD (Geração, Transmissão e Distribuição)' },
  { value: 'Energias Renováveis', label: 'Energias Renováveis' },
  { value: 'Eletroeletrônica', label: 'Eletroeletrônica' },
  { value: 'Gráfica', label: 'Gráfica' },
  { value: 'Gestão', label: 'Gestão' },
  { value: 'Mecânica Automotiva', label: 'Mecânica Automotiva' },
  { value: 'Metalmecânica', label: 'Metalmecânica' },
  { value: 'Mineração', label: 'Mineração' },
  { value: 'Refrigeração', label: 'Refrigeração' },
  { value: 'Têxtil e Vestuário', label: 'Têxtil e Vestuário' },
  { value: 'TI', label: 'TI' },
];

export const modalityOptions = [
  { value: 'Técnico', label: 'Técnico' },
  { value: 'Aperfeiçoamento', label: 'Aperfeiçoamento' },
  { value: 'Qualificação', label: 'Qualificação' },
  { value: 'Iniciação', label: 'Iniciação' },
];

export const paymentOptions = [
  { value: 'Técnico', label: 'Técnico' },
  { value: 'Aperfeiçoamento', label: 'Aperfeiçoamento' },
  { value: 'Qualificação', label: 'Qualificação' },
  { value: 'Iniciação', label: 'Iniciação' },
];
export const paymentInstallmentOptions = [
  { value: '1', label: '1x sem juros' },
  { value: '2', label: '2x sem juros' },
  { value: '3', label: '3x sem juros' },
  { value: '4', label: '4x sem juros' },
  { value: '5', label: '5x sem juros' },
  { value: '6', label: '6x sem juros' },
  { value: '7', label: '7x sem juros' },
  { value: '8', label: '8x sem juros' },
  { value: '9', label: '9x sem juros' },
  { value: '10', label: '10x sem juros' },
  { value: '11', label: '11x sem juros' },
  { value: '12', label: '12x sem juros' },
];
