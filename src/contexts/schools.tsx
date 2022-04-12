import {
  createContext, ReactNode, useCallback, useContext, useReducer, useState,
} from 'react';

type Schools = {
    id: string;
    name: string;
    initials: string;
    email: string;
    phone: string;
    zipCode: string;
    street: string;
    neighborhood: string;
    number: string;
    city: string;
    estate: string;
    status: string;
    application_deadline: string;
    pre_registration_email: string;
    application_email: string;
    lean_office_email: string;
    free_enrollment_block: boolean; // Futuro
    free_enrollment_block_time: string; // Futuro
}
