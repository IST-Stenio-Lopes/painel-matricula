/* eslint-disable no-shadow */
import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

type Classroom = {
    course_id?: string; // curso: id, nome
    // partner_id: string; vai existir futuramente
    category: string; // modo: presencial, EAD, etc.
    shift: string; // turno: manhã, tarde, noite.
    application_deadline: string; // prazo de pré matricula
    code?: string; // Não modificar
    days_of_presence: string; // dia de aula: Segunda e Quarta, Terça e Quinta, etc.
    month: string; // mes de inicio
    year: string;
    type: string; // Gratuito, Pago
    number_of_vacancies: string; // numero de vagas
    // promotional_code: string;
    status?: string; // aberta, fechada, finalizada
}
// Reducer
export enum ClassroomActions {
  course_id,
  category,
  shift,
  application_deadline,
  code,
  days_of_presence,
  month,
  year,
  type,
  number_of_vacancies,
  promotional_code,
  status,

  reset
}

type Action = {
    type: ClassroomActions;
    payload: any;
}
type ContextType = {
    stateCourse: Classroom;
    dispatch: (action: Action) => void;
}

const initialData: Classroom = { // dados iniciais
  course_id: '',
  category: '',
  shift: '',
  application_deadline: '',
  days_of_presence: '',
  month: '',
  year: '',
  type: '',
  number_of_vacancies: '',

};

// Context
const ClassroomContext = createContext<ContextType | undefined>(undefined);

const courseReducer = (course: Classroom, action: Action): Classroom => {
  // Ela recebe uma state (os dados), e recebe uma action
  // (que ação eu quero executar com esses dados)
  //  um switch pra ver qual ação eu vou querer realizar,
  //   o type fala o tipo de ação, exemplo: trocar o nome do
  // usuário que está no contexto, um setName.
  switch (action.type) {
    case ClassroomActions.course_id:
      return { ...course, course_id: action.payload };

    case ClassroomActions.reset:
      return initialData;
    default:
      return course;
  }
};

// Provider
export const CourseProvider: React.FC = ({ children }) => {
  // state tem os dados, e dispatch tem uma função que usa
  // para executar as ações
  // segundo parametro são dados iniciais
  const [stateCourse, dispatch] = useReducer(courseReducer, initialData);
  const value = useMemo(() => ({ stateCourse, dispatch }), [stateCourse]);

  return (

    <ClassroomContext.Provider value={value}>
      {' '}
      {/* value é um objeto com 2 itens q precise */}
      {children}
    </ClassroomContext.Provider>
  );
};

// Context Hook
export const useCourse = (): ContextType => {
  const context = useContext(ClassroomContext);

  if (context === undefined) {
    throw new Error('useCourse precisa ser usado dentro do CourseProvider');
  }
  return context;
};
