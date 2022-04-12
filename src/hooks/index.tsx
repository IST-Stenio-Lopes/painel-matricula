import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';

import { NavProvider } from './nav';
import { StudentProvider } from './student';
import { EnrollmentProvider } from './enrollment';

const AppProvider: React.FC = ({ children }) => (
  <ModalProvider>
    <NavProvider>
      <AuthProvider>
        <EnrollmentProvider>
          <StudentProvider>
            {children}
          </StudentProvider>
        </EnrollmentProvider>
      </AuthProvider>
    </NavProvider>
  </ModalProvider>
);

export default AppProvider;
