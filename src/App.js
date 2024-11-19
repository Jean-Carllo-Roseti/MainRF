import React, { useState } from 'react';

import Malha from "./components/malha/index.jsx";
import Molliers from "./components/molliers/index.jsx";
import { GlobalCss } from "./styles.tsx";


function App() {

  const [salvarMalha, setSalvarMalha] = useState(false);
  const [salvarMolliers, setSalvarMolliers] = useState(false);

  const handleSalvarMalha = () => {
    setSalvarMalha(true);
  };

  const handleSalvarMolliers = () => {
    setSalvarMolliers(true);
  };
  
  return (
    <>
    <GlobalCss />
    <div className="App">
    <Malha salvar={salvarMalha} setSalvar={setSalvarMalha} />
      <Molliers salvar={salvarMolliers} setSalvar={setSalvarMolliers} />
      <button onClick={handleSalvarMalha}>Salvar Malha</button>
      <button onClick={handleSalvarMolliers}>Salvar Molliers</button>
    </div>
    </>
  );
}

export default App;
