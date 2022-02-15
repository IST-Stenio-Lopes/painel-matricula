import React from 'react';

import { FaqProvider } from './faq';

const AppProvider: React.FC = ({ children }) => (

    <FaqProvider>
        {children}
    </FaqProvider>


);

export default AppProvider;
