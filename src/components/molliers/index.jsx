// import GraficoA from '../../assets/images/imagem.png'
// import GraficoB from '../../assets/images/imagem2.png'
// import GraficoC from '../../assets/images/imagem3.png'
// import { OrgMolliers } from './styles'
// import React, { useState, useEffect } from 'react';

// const Molliers = () => {
//     const imagens = [
//         GraficoA,  // Substitua com o caminho correto das suas imagens
//         GraficoB,
//         GraficoC
//     ];
  
//     const [currentIndex, setCurrentIndex] = useState(0);
  
//     useEffect(() => {
//       const intervalId = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % imagens.length);
//       }, 1000); // Troca a cada 1 segundo
  
//       // Limpeza do intervalo quando o componente for desmontado
//       return () => clearInterval(intervalId);
//     }, [imagens.length]); // O array vazio significa que o efeito ocorre uma vez ao montar o componente
  
//     return (
//       <OrgMolliers>
//         {imagens.map((imagem, index) => (
//           <li key={index} style={{ display: currentIndex === index ? 'block' : 'none' }}>
//             <img src={imagem} alt={`Gráfico ${index + 1}`} />
//           </li>
//         ))}
//       </OrgMolliers>
//     );
//   };
  
//   export default Molliers;

import GraficoA from '../../assets/images/imagem.png';
import GraficoB from '../../assets/images/imagem2.png';
import GraficoC from '../../assets/images/imagem3.png';
import { OrgMolliers } from './styles';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';


const Molliers = ({ salvar, setSalvar  }) => {
  const imagens = [GraficoA, GraficoB, GraficoC];
  // Estado para forçar atualização
  const [atualizar, setAtualizar] = useState(0);

  useEffect(() => {
    if (salvar) {
      salvarComoImagem();
      setSalvar(false); // Resetar o estado após salvar
    }
  }, [salvar, setSalvar]);


  const salvarComoImagem = () => {
    const componente = document.getElementById('componenteMolliersParaSalvar');
    html2canvas(componente).then((canvas) => {
      const imagemURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imagemURL;
      link.download = 'molliers.png';
      link.click();
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAtualizar(atualizar + 1); // Incrementa para forçar atualização
    }, 600); // Atualiza a cada 1 segundo

    return () => clearInterval(intervalId);
  }, [atualizar]);

  return (
    <OrgMolliers id='componenteMolliersParaSalvar'>
      {imagens.map((imagem, index) => (
        <li key={index}>
          <img src={imagem} alt={`Gráfico ${index + 1}`} key={atualizar} />
        </li>
      ))}
    </OrgMolliers>
  );
};

export default Molliers;