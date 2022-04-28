/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { BitField } from 'easy-bits';

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role_name: string;
  role: number;
  cpf: string;
  cell_phone: string;
  company_id: string;
  school_id: string;
  school_city: string;
  school_estate: string;
  school_initials: string;
}

export enum UserRoles {
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
  Gerir_Propagandas = Criar_Anuncios | Criar_Descontos | Editar_Anuncios | Editar_Descontos | Remover_Anuncios | Remover_Descontos,

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
  Gerir_Localizacoes = Listar_Localizacoes | Editar_Localizacao,

  Criar_Parceiros = 1 << 22,
  Editar_Parceiros = 1 << 23,
  Remover_Parceiros = 1 << 24,
  Gerir_Parceiros = Criar_Parceiros | Editar_Parceiros | Remover_Parceiros,

  Criar_Financas = 1 << 25,
  Editar_Financas = 1 << 26,
  Remover_Financas = 1 << 27,
  Gerir_Financas = Criar_Financas | Editar_Financas | Remover_Financas,

  // Acessos Fixos
  Visitante = 0,

  Atendente = Gerir_Cursos | Gerir_Matriculas | Gerir_Turmas,

  Coordenador = 1 << 28 | Gerir_Usuarios | Gerir_Turmas | Gerir_Cursos | Gerir_Matriculas,

  Tesoureiro = 1 << 29 | Gerir_Propagandas | Gerir_Parceiros,

  Diretor = 1 << 30 | Gerir_Usuarios | Gerir_Propagandas | Gerir_Turmas | Gerir_Cursos | Gerir_Matriculas | Gerir_Parceiros | Gerir_Localizacoes,

  Desenvolvedor = 1 << 31 | Gerir_Usuarios | Gerir_Propagandas | Gerir_Turmas | Gerir_Cursos | Gerir_Matriculas | Gerir_Parceiros | Gerir_Localizacoes,
}

export const roleOptions = [
  { value: UserRoles.Visitante, label: 'Visitante' },
  { value: UserRoles.Atendente, label: 'Atendente' },
  { value: UserRoles.Coordenador, label: 'Coordenador' },
  { value: UserRoles.Tesoureiro, label: 'Tesoureiro' },
  { value: UserRoles.Diretor, label: 'Diretor' },
  { value: UserRoles.Desenvolvedor, label: 'Desenvolvedor' },
];

export const userPermissions = [
  {
    title: 'Usuários',
    allPermissions: { name: 'Usuários', role: UserRoles.Gerir_Usuarios },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Usuarios },
      { name: 'Editar', role: UserRoles.Editar_Usuarios },
      { name: 'Remover', role: UserRoles.Remover_Usuarios },
    ],
  },
  {
    title: 'Anúncios',
    allPermissions: { name: 'Anúncios', role: UserRoles.Criar_Anuncios + UserRoles.Editar_Anuncios + UserRoles.Remover_Anuncios },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Anuncios },
      { name: 'Editar', role: UserRoles.Editar_Anuncios },
      { name: 'Remover', role: UserRoles.Remover_Anuncios },
    ],
  },
  {
    title: 'Descontos',
    allPermissions: { name: 'Descontos', role: UserRoles.Criar_Descontos + UserRoles.Editar_Descontos + UserRoles.Remover_Descontos },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Descontos },
      { name: 'Editar', role: UserRoles.Editar_Descontos },
      { name: 'Remover', role: UserRoles.Remover_Descontos },
    ],
  },
  {
    title: 'Turmas',
    allPermissions: { name: 'Turmas', role: UserRoles.Gerir_Turmas },
    permissions: [
      { name: 'Iniciar', role: UserRoles.Iniciar_Turmas },
      { name: 'Criar', role: UserRoles.Criar_Turmas },
      { name: 'Editar', role: UserRoles.Editar_Turmas },
      { name: 'Remover', role: UserRoles.Remover_Turmas },
    ],
  },
  {
    title: 'Cursos',
    allPermissions: { name: 'Cursos', role: UserRoles.Gerir_Cursos },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Cursos },
      { name: 'Editar', role: UserRoles.Editar_Cursos },
      { name: 'Remover', role: UserRoles.Remover_Cursos },
    ],
  },
  {
    title: 'Matrículas',
    allPermissions: { name: 'Matrículas', role: UserRoles.Gerir_Matriculas },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Matriculas },
      { name: 'Editar', role: UserRoles.Editar_Matriculas },
      { name: 'Remover', role: UserRoles.Remover_Matriculas },
    ],
  },
  {
    title: 'Parceiros',
    allPermissions: { name: 'Parceiros', role: UserRoles.Gerir_Parceiros },
    permissions: [
      { name: 'Criar', role: UserRoles.Criar_Parceiros },
      { name: 'Editar', role: UserRoles.Editar_Parceiros },
      { name: 'Remover', role: UserRoles.Remover_Parceiros },
    ],
  },
  {
    title: 'Localizações',
    allPermissions: { name: 'Localizações', role: UserRoles.Editar_Localizacao | UserRoles.Listar_Localizacoes },
    permissions: [
      { name: 'Visualizar', role: UserRoles.Listar_Localizacoes },
      { name: 'Editar', role: UserRoles.Editar_Localizacao },
    ],
  },
];

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
