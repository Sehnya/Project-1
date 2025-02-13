console.log("main.jsx executed");
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import Workspace from './components/Workspace';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Workspace />
    </React.StrictMode>
);