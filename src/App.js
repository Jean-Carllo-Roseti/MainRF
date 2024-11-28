import React, { useState } from "react";

import Malha from "./components/malha/index.jsx";
import Molliers from "./components/molliers/index.jsx";
import { GlobalCss } from "./styles.tsx";

function App() {
  const [salvarMalha, setSalvarMalha] = useState(false);
  const [salvarMolliers, setSalvarMolliers] = useState(false);
  const [textAreaValues, setTextAreaValues] = useState([]); // Armazena os valores dos inputs do Malha

  // Função que salva ambos os componentes
  const handleSalvarTudo = () => {
    setSalvarMalha(true);
    setSalvarMolliers(true);
  };

  return (
    <>
      <GlobalCss />
      <div className="App">
        <Malha salvar={salvarMalha} setSalvar={setSalvarMalha} setTextAreaValues={setTextAreaValues}/>
        <Molliers salvar={salvarMolliers} setSalvar={setSalvarMolliers} textAreaValues={textAreaValues}/>
        <button className="botao-salvar"  onClick={handleSalvarTudo}>Save</button>
      </div>
    </>
  );
}

export default App;
