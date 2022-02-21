import { createContext, ReactNode, useCallback, useContext, useReducer, useState } from 'react';

interface CourseContent {
    title: string;
    credits: string;
}

type Course = {
    id?: string;
    name: string;
    field: string;
    cost: number;
    modality: string;
    duration: string;
    tags?: string[];
    payment_installment?: number;
    enrolment_fee?: number;
    description?: string;
    prerequisites?: string;
    grade?: CourseContent[];
}

type Action = {
    type: CourseActions;
    payload: any;
}
type ContextType = {
    stateCourse: Course;
    dispatch: (action: Action) => void;
}

type CourseProviderProps = {
    children: ReactNode;
}

const initialData: Course = { //dados iniciais
    name: '',
    field: '',
    cost: 0,
    modality: '',
    duration: ''
}


// Context
const CourseContext = createContext<ContextType | undefined>(undefined);

//Reducer
export enum CourseActions {
    setId,
    setName,
    setField,
    setCost,
    setModality,
    setDuration,
    setCourse_id,
    setSchool_id,
    setTags,
    setPayment_installment,
    setEnrolment_fee,
    setDescription,
    setPrerequisites,
    setGrade,

    reset
}
const courseReducer = (course: Course, action: Action) => { //Ela recebe uma state (os dados), e recebe uma action (que ação eu quero executar com esses dados)
    switch (action.type) { //um switch pra ver qual ação eu vou querer realizar, o type fala o tipo de ação, exemplo: trocar o nome do usuário que está no contexto, um setName.
        case CourseActions.setId:
            return { ...course, id: action.payload };
        case CourseActions.setName:
            return { ...course, name: action.payload };
        case CourseActions.setField:
            return { ...course, field: action.payload };
        case CourseActions.setCost:
            return { ...course, cost: action.payload };
        case CourseActions.setModality:
            return { ...course, modality: action.payload };
        case CourseActions.setDuration:
            return { ...course, duration: action.payload };
        case CourseActions.setCourse_id:
            return { ...course, course_id: action.payload };
        case CourseActions.setSchool_id:
            return { ...course, school_id: action.payload };
        case CourseActions.setTags:
            return { ...course, tags: action.payload };
        case CourseActions.setPayment_installment:
            return { ...course, payment_installment: action.payload };
        case CourseActions.setEnrolment_fee:
            return { ...course, enrolment_fee: action.payload };
        case CourseActions.setDescription:
            return { ...course, description: action.payload };
        case CourseActions.setPrerequisites:
            return { ...course, prerequisites: action.payload };
        case CourseActions.setGrade:
            return { ...course, grade: action.payload };

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