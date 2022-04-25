export interface IMessage {
  id: string;
  object_id: string;
}

export enum StatusOfMessage
{
  Lida = 'Lida',
  NaoLida = 'Não Lida',
  Removido = 'Removido',
  Excluido = 'Excluído',
}
