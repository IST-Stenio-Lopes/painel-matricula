/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
import {
  createContext, ReactElement, ReactNode, useCallback, useContext, useReducer, useState,
} from 'react';

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

const initialData: Course = { // dados iniciais
  name: '',
  field: '',
  cost: 0,
  modality: '',
  duration: '',
};

// Context
const CourseContext = createContext<ContextType | undefined>(undefined);

// Reducer
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
const courseReducer = (course: Course, action: Action): Course => {
  switch (action.type) {
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
      return { ...course, id: action.payload };
    case CourseActions.setSchool_id:
      return { ...course, id: action.payload };
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
      return initialData;
    default:
      return course;
  }
};

// Provider
export const CourseProvider = ({ children }: CourseProviderProps): ReactElement => {
  const [stateCourse, dispatch] = useReducer(courseReducer, initialData);

  return (
    <CourseContext.Provider value={{ stateCourse, dispatch }}>
      {' '}
      {/* value é um objeto com 2 itens q precise */}
      {children}
    </CourseContext.Provider>
  );
};

// Context Hook
export const useCourse = (): ContextType => {
  const context = useContext(CourseContext);

  if (context === undefined) {
    throw new Error('useCourse precisa ser usado dentro do CourseProvider');
  }
  return context;
};
