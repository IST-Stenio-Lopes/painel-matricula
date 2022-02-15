import { createContext, ReactNode, useCallback, useContext, useReducer, useState } from 'react';

type Faq = {
    id?: string;
    title: string;
    category: string;
    content: string;
    created_at?: Date;
}


type Action = {
    type: FaqActions;
    payload: any;
}

type ContextType = {
    stateFaq: Faq;
    dispatch: (action: Action) => void;
}

type FaqProviderProps = {
    children: ReactNode;
}

const initialData: Faq = { //dados iniciais
    //id: '',
    title: '',
    category: '',
    content: ''
    //created_at: new Date()
}

// Context
const FaqContext = createContext<ContextType | undefined>(undefined);


//Reducer
export enum FaqActions {
    setId,
    setTitle,
    setCategory,
    setContent,
    reset
}

const faqReducer = (faq: Faq, action: Action) => { //Ela recebe uma state (os dados), e recebe uma action (que ação eu quero executar com esses dados)
    switch (action.type) { //um switch pra ver qual ação eu vou querer realizar, o type fala o tipo de ação, exemplo: trocar o nome do usuário que está no contexto, um setName.
        case FaqActions.setId:
            return { ...faq, id: action.payload };
        case FaqActions.setTitle:
            return { ...faq, title: action.payload };
        case FaqActions.setCategory:
            return { ...faq, category: action.payload };
        case FaqActions.setContent:
            return { ...faq, content: action.payload };
        case FaqActions.reset:
            return initialData
        default:
            return faq;
    }
}



//Provider
export const FaqProvider = ({ children }: FaqProviderProps) => {

    const [stateFaq, dispatch] = useReducer(faqReducer, initialData); //state tem os dados, e dispatch tem uma função que usa para executar as ações //segundo parametro são dados iniciais
    const value = { stateFaq, dispatch };




    return (
        <FaqContext.Provider value={value}> {/* value é um objeto com 2 itens q precise*/}
            {children}
        </FaqContext.Provider>
    );
}


// Context Hook

export const useFaq = () => {
    const context = useContext(FaqContext);

    if (context === undefined) {
        throw new Error('useFaq precisa ser usado dentro do FaqProvider');
    }
    return context;
}