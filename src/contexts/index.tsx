import React from 'react';
import { CourseProvider } from './curso';

import { FaqProvider } from './faq';

const AppProvider: React.FC = ({ children }) => (

  <CourseProvider>
    <FaqProvider>
      {children}
    </FaqProvider>
  </CourseProvider>

);

export default AppProvider;
