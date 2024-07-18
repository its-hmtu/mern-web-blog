import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteList from './routes';

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <RouteList />
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
