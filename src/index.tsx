import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LftProvider } from '@lift/design-system-react-web/dist/contexts';

//const marca = 'yduqs';
const marca = 'estacio';
// const marca = 'wyden';
const template = 'default';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LftProvider brand={marca} template={template}>
      <App />
    </LftProvider>
  </React.StrictMode>
);

