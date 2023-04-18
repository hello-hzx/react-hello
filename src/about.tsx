import React from 'react';
import ReactDOM from 'react-dom/client';

function AboutApp() {
  return <h1>About</h1>;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<AboutApp />);
