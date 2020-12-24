import React from 'react';

import Home from './pages/Home';

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = 'Atualizar página? Um novo cartão será gerado.';
});

const App = () => (
  <>
    <Home />
  </>
);

export default App;
