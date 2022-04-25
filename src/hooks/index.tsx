import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';

import { NavProvider } from './nav';
import { StudentProvider } from './student';
import { EnrollmentProvider } from './enrollment';
import { ClassroomProvider } from './classroom';
import { DashboardDataProvider } from './dashboardData';

const AppProvider: React.FC = ({ children }) => (
  <DashboardDataProvider>
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
  </DashboardDataProvider>
);

export default AppProvider;
