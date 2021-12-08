import React from 'react';

import AppProvider from './hooks';

import Routes from './routes/routes'

const Index = () => {
  return(
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default Index