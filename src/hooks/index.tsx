import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';

import { NavProvider } from './nav';
import { StudentProvider } from './student';
import { EnrollmentProvider } from './enrollment';
import { ClassroomProvider } from './classroom';

const AppProvider: React.FC = ({ children }) => (
  <ModalProvider>
    <NavProvider>
      <AuthProvider>
        <ClassroomProvider>
          <EnrollmentProvider>
            <StudentProvider>
              {children}
            </StudentProvider>
          </EnrollmentProvider>
        </ClassroomProvider>
      </AuthProvider>
    </NavProvider>
  </ModalProvider>
);

export default AppProvider;
