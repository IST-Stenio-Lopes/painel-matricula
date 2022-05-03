import React, { SVGProps } from 'react';
import { ReactComponent as AnunciosSvg } from '../../../../assets/icons/menu/anuncios-icon.svg';
import { ReactComponent as CursosSvg } from '../../../../assets/icons/menu/cursos-icon.svg';
import { ReactComponent as DashboardSvg } from '../../../../assets/icons/menu/dashboard-icon.svg';
import { ReactComponent as FaqSvg } from '../../../../assets/icons/menu/faq-icon.svg';
import { ReactComponent as FinanceiroSvg } from '../../../../assets/icons/menu/financeiro-icon.svg';
import { ReactComponent as RelatorioSvg } from '../../../../assets/icons/menu/relatorio-icon.svg';
import { ReactComponent as MatriculaSvg } from '../../../../assets/icons/menu/matricula-icon.svg';
import { ReactComponent as MensagemSvg } from '../../../../assets/icons/menu/mensagem-icon.svg';
import { ReactComponent as TurmasSvg } from '../../../../assets/icons/menu/turmas-icon.svg';
import { ReactComponent as UnidadeSvg } from '../../../../assets/icons/menu/unidade-icon.svg';
import { ReactComponent as PartnerSvg } from '../../../../assets/icons/menu/partner-icon.svg';
import { ReactComponent as SettingsSvg } from '../../../../assets/icons/menu/settings-icon.svg';

interface DataProps {
  title: string;
  path: string;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
}

export const SidebarData: DataProps[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: DashboardSvg,
  },
  {
    title: 'Matrícula',
    path: '/matricula',
    icon: MatriculaSvg,
  },
  {
    title: 'Cursos',
    path: '/cursos',
    icon: CursosSvg,
  },
  {
    title: 'Turmas',
    path: '/turmas',
    icon: TurmasSvg,
  },
  {
    title: 'Anuncios',
    path: '/anuncios',
    icon: AnunciosSvg,
  },
  {
    title: 'Unidade',
    path: '/unidade',
    icon: UnidadeSvg,
  },
  {
    title: 'Mensagens',
    path: '/mensagens',
    icon: MensagemSvg,
  },
  {
    title: 'Relatorio',
    path: '/relatorio',
    icon: RelatorioSvg,
  },
  {
    title: 'FAQ',
    path: '/faq',
    icon: FaqSvg,
  },
  {
    title: 'Financeiro',
    path: '/financeiro',
    icon: FinanceiroSvg,
  },
  {
    title: 'Parceiros',
    path: '/parceiros',
    icon: PartnerSvg,
  },
  {
    title: 'Configurações',
    path: '/configuracoes',
    icon: SettingsSvg,
  },
];
