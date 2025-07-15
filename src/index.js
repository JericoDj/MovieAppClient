
import ReactDOM from 'react-dom/client';
import App from './App';

import AOS from 'aos';




AOS.init({
  duration: 800,
  once: true, // animation runs only once on scroll
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <App />
  </>
);
