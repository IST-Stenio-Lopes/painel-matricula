/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { BitField } from 'easy-bits';

export enum UserRoles {
  ACESSO_INVALIDO = 0,

  Criar_Usuarios = 1 << 1,
  Editar_Usuarios = 1 << 2,
  Remover_Usuarios = 1 << 3,
  Gerir_Usuarios = Criar_Usuarios | Editar_Usuarios | Remover_Usuarios,

  Criar_Anuncios = 1 << 4,
  Criar_Descontos = 1 << 5,
  Editar_Anuncios = 1 << 6,
  Editar_Descontos = 1 << 7,
  Remover_Anuncios = 1 << 8,
  Remover_Descontos = 1 << 9,
  Gerir_Propagandas = Criar_Anuncios | Criar_Descontos | Editar_Anuncios
  | Editar_Descontos | Remover_Anuncios | Remover_Descontos,

  Criar_Turmas = 1 << 10,
  Editar_Turmas = 1 << 11,
  Remover_Turmas = 1 << 12,
  Iniciar_Turmas = 1 << 13,
  Gerir_Turmas = Criar_Turmas | Editar_Turmas | Remover_Turmas | Iniciar_Turmas,

  Criar_Cursos = 1 << 14,
  Editar_Cursos = 1 << 15,
  Remover_Cursos = 1 << 16,
  Gerir_Cursos = Criar_Cursos | Editar_Cursos | Remover_Cursos,

  Criar_Matriculas = 1 << 17,
  Editar_Matriculas = 1 << 18,
  Remover_Matriculas = 1 << 19,
  Gerir_Matriculas = Criar_Matriculas | Editar_Matriculas | Remover_Matriculas,

  Listar_Localizacoes = 1 << 20,
  Editar_Localizacao = 1 << 21,

  Criar_Parceiros = 1 << 22,
  Editar_Parceiros = 1 << 23,
  Remover_Parceiros = 1 << 24,
  Gerir_Parceiros = Criar_Parceiros | Editar_Parceiros | Remover_Parceiros,

  // Acessos Fixos
  Visitante = 1 << 27,

  Coordenador = 1 << 28 | Gerir_Usuarios | Gerir_Propagandas | Gerir_Turmas
  | Gerir_Cursos | Gerir_Matriculas | Gerir_Parceiros,

  Tesoureiro = 1 << 29 | Gerir_Usuarios | Gerir_Propagandas | Gerir_Turmas
  | Gerir_Cursos | Gerir_Matriculas | Gerir_Parceiros,

  Diretor = 1 << 30 | Gerir_Usuarios | Gerir_Propagandas | Gerir_Turmas
  | Gerir_Cursos | Gerir_Matriculas | Gerir_Parceiros,

  Desenvolvedor = 1 << 31 | Gerir_Usuarios | Gerir_Propagandas | Gerir_Turmas
  | Gerir_Cursos | Gerir_Matriculas | Gerir_Parceiros,
}

const role_BitField = new BitField<UserRoles>();

export function updateUserRoles(role: number): void {
  role_BitField.on(role);
}

export function getRole(Expected_Access: UserRoles): boolean {
  return role_BitField.test(Expected_Access);
}

export function getAnyRole(Expected_Access: UserRoles): boolean {
  return role_BitField.testAny(Expected_Access);
}
