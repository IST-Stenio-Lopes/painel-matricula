import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';

import { NavProvider } from './nav';
import { StudentProvider } from './student';
import { EnrollmentProvider } from './enrollment';
import { ClassroomProvider } from './classroom';
import { DashboardDataProvider } from './dashboardData';
import { RolesProvider } from './roles';

const AppProvider: React.FC = ({ children }) => (
  <DashboardDataProvider>
    <RolesProvider>
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
    </RolesProvider>
  </DashboardDataProvider>
);

export default AppProvider;
