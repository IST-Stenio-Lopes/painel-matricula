/**
 *  user_id?: string; // Não precisa mandar
  school_id: string; // Não precisa mandar
  course_id: string;
  partner_id: string;
  category: string;
  shift: string;
  application_deadline: string;
  code: string; //Não modificar
  days_of_presence: string;
  month: string;
  year: string;
  type: string;
  number_of_vacancies: string;
  promotional_code: string;
  status?: string;
 */

import { createContext, ReactNode, useCallback, useContext, useReducer, useState } from 'react';


type Classroom = {
    course_id?: string; //curso: id, nome
    //partner_id: string; vai existir futuramente
    category: string; //modo: presencial, EAD, etc.
    shift: string; //turno: manhã, tarde, noite.
    application_deadline: string; //prazo de pré matricula
    code?: string; //Não modificar
    days_of_presence: string; //dia de aula: Segunda e Quarta, Terça e Quinta, etc.
    month: string; //mes de inicio
    year: string;
    type: string; //Gratuito, Pago
    number_of_vacancies: string; //numero de vagas
    //promotional_code: string; 
    status?: string; //aberta, fechada, finalizada
}

type Action = {
    type: ClassroomActions;
    payload: any;
}
type ContextType = {
    stateCourse: Classroom;
    dispatch: (action: Action) => void;
}

type CourseProviderProps = {
    children: ReactNode;
}

const initialData: Classroom = { //dados iniciais
    course_id: '',
    category: '',
    shift: '',
    application_deadline: '',
    days_of_presence: '',
    month: '',
    year: '',
    type: '',
    number_of_vacancies: '',

}

// Context
const ClassroomContext = createContext<ContextType | undefined>(undefined);


//Reducer
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

const courseReducer = (course: Course, action: Action) => { //Ela recebe uma state (os dados), e recebe uma action (que ação eu quero executar com esses dados)
    switch (action.type) { //um switch pra ver qual ação eu vou querer realizar, o type fala o tipo de ação, exemplo: trocar o nome do usuário que está no contexto, um setName.
        case CourseActions.setId:
            return { ...course, id: action.payload };


        case CourseActions.reset:
            return initialData
        default:
            return course;
    }
}

//Provider
export const CourseProvider = ({ children }: CourseProviderProps) => {

    const [stateCourse, dispatch] = useReducer(courseReducer, initialData); //state tem os dados, e dispatch tem uma função que usa para executar as ações //segundo parametro são dados iniciais
    const value = { stateCourse, dispatch };


    return (
        <CourseContext.Provider value={value}> {/* value é um objeto com 2 itens q precise*/}
            {children}
        </CourseContext.Provider>
    );
}

// Context Hook
export const useCourse = () => {
    const context = useContext(CourseContext);

    if (context === undefined) {
        throw new Error('useCourse precisa ser usado dentro do CourseProvider');
    }
    return context;
}