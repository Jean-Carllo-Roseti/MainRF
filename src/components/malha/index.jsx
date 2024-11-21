import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { getDadosSensores } from '../../services/axiosDados';
import { Fundo } from './styles';


const getTimestamp = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');
  const segundo = String(data.getSeconds()).padStart(2, '0');

  return  (
    <span>
      {dia}/{mes}/{ano}
      <br />
      {hora}:{minuto}:{segundo}
    </span>
  );
};

const Malha = ({ salvar,setSalvar }) => {
  const [dados, setDados] = useState({ temperaturas: [], pressoes: [] });
  const [salvando, setSalvando] = useState(false);
  const [timestamp, setTimestamp] = useState(getTimestamp());

  const posicoesTimestamps = [
    { x: 1120, y: 398 },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(getTimestamp());
    }, 1000); // Atualiza a cada 1000 milissegundos (1 segundo)

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []); // Executa uma vez quando o componente é montado

  useEffect(() => {
    if (salvar && !salvando) {
      setSalvando(true);
      salvarComoImagem().then(() => setSalvando(false));
      setSalvar(false);
    }
  }, [salvar, setSalvar, salvando]);

  // Posições fixas para cada valor
  const posicoesTemperaturas = [
    { x: 130, y: 140, texto: 'T1', backgroundColor: 'black', color: 'white' }, //T1 BOX1
    { x: 130, y: 230, texto: 'T2', backgroundColor: 'black', color: 'white'  }, //T2
    { x: 20, y: 110, texto: 'T3', backgroundColor: 'black', color: 'white'  }, //T3
    { x: 20, y: 140, texto: 'T4', backgroundColor: 'black', color: 'white'  }, //T4
    { x: 30, y: 235, texto: 'TEO', backgroundColor: 'black', color: 'white'  }, //T5  
    { x: 280, y: 280, texto: 'T6', backgroundColor: 'black', color: 'white'  }, //T6 BOX2
    { x: 280, y: 400, texto: 'T7', backgroundColor: 'black', color: 'white'  }, //T7 
    { x: 180, y: 400, texto: 'TEO', backgroundColor: 'black', color: 'white'  }, //T8
    { x: 355, y: 350, texto: 'T9', backgroundColor: 'black', color: 'white'  }, //T9
    { x: 355, y: 310, texto: 'T10', backgroundColor: 'black', color: 'white'  }, //T10
    { x: 764, y: 322, texto: 'T11', backgroundColor: 'black', color: 'white'  }, //T11 BOX 3
    { x: 764, y: 384, texto: 'T12', backgroundColor: 'black', color: 'white'  }, //T12
    { x: 720, y: 410, texto: 'TEO', backgroundColor: 'black', color: 'white'  }, //T13
    { x: 610, y: 290, texto: 'T14', backgroundColor: 'black', color: 'white' }, //T14
    { x: 610, y: 320, texto: 'T15', backgroundColor: 'black', color: 'white'  }, //T15
    { x: 580, y: 225, texto: 'T16', backgroundColor: 'black', color: 'white'  }, //T16 BOX 4
    { x: 705, y: 250, texto: 'T17', backgroundColor: 'black', color: 'white'  }, //T17
    { x: 705, y: 135, texto: 'T18', backgroundColor: 'black', color: 'white'  }, //T18
    { x: 820, y: 195, texto: 'T19', backgroundColor: 'black', color: 'white'  }, //T19
    { x: 885, y: 100, texto: 'TF', backgroundColor: 'black', color: 'white'  }, //T20
    { x: 930, y: 210, texto: 'T21', backgroundColor: 'black', color: 'white'  }, //T21 LINHA ROSA
    { x: 930, y: 280, texto: 'T22', backgroundColor: 'black', color: 'white'  }, //T22 LINHA VERDE
    { x: 1090, y: 260, texto: 'TC', backgroundColor: 'black', color: 'white'  }, //T23 COMPRESSOR
    { x: 1090, y: 120, texto: 'TM', backgroundColor: 'black', color: 'white'  }, //T24 MOTOR
    { x: 520, y: 105, texto: 'T25', backgroundColor: 'black', color: 'white'  }, //T25 
    // { x: 150, y: 200 }, //T26
  ];

  const posicoesPressao = [
    { x: 130, y: 110, texto: 'P1',backgroundColor: 'black', color: 'white'  }, //P1 BOX1
    { x: 130, y: 200, texto: 'P2',backgroundColor: 'black', color: 'white'  }, //P2
    { x: 280, y: 250, texto: 'P3',backgroundColor: 'black', color: 'white'  }, //P3 BOX2
    { x: 280, y: 375, texto: 'P4',backgroundColor: 'black', color: 'white'  }, //P4
    { x: 764, y: 292, texto: 'P5',backgroundColor: 'black', color: 'white'  }, //P5 BOX3
    { x: 764, y: 355, texto: 'P6',backgroundColor: 'black', color: 'white'  }, //P6
    { x: 580, y: 195, texto: 'P7',backgroundColor: 'black', color: 'white'  }, //P7 BOX4
    { x: 930, y: 170, texto: 'P8',backgroundColor: 'black', color: 'white'  }, //P8
    { x: 930, y: 240, texto: 'P9',backgroundColor: 'black', color: 'white'  }, //P9
    // { x: 100, y: 50 }, //P10
  ];


  const posicoesPalavras = [
    { x: 115, y: 5, texto: 'Suction - Gasous Freon' }, //info Legenda Malha
    { x: 115, y: 28, texto: 'Pressure - Gasous Freon' },
    { x: 115, y: 50, texto: 'Pressure - Liquidi Freon' }, 
    { x: 463, y: 25, texto: 'P2, P4, P6, P7, P8 SB69-500V' },
    { x: 463, y: 45, texto: 'P1, P3, P5, P9 SB69-100V' }, 
    { x: 463, y: 5, texto: 'Sensor de Temperatura TF43' }, 
    { x: 40, y: 95, texto: 'Air In' }, //BOX 1
    { x: 40, y: 125, texto: 'Air Out' },
    { x: 245, y: 115, texto: 'Out Refr' },
    { x: 285, y: 205, texto: 'In Refr' },
    { x: 20, y: 260, texto: 'Evaporator Module' }, 

    { x: 380, y: 295, texto: 'Air Out' }, //BOX2
    { x: 380, y: 335, texto: 'Air In' }, 
    { x: 160, y: 320, texto: 'Evaporator Module' }, 

    { x: 640, y: 305, texto: 'Air Out' }, //BOX3
    { x: 640, y: 275, texto: 'Air In' }, 
    { x: 901, y: 390, texto: 'Evaporator Module' }, 
    { x: 535, y: 390, texto: 'In Refr' }, 
    { x: 850  , y: 255, texto: 'Out Refr' }, 

    { x: 850, y: 180, texto: 'Air In' }, //BOX4
    { x: 730, y: 235, texto: 'Temp In' }, 
    { x: 730, y: 120, texto: 'Temp Out' }, 
    { x: 645, y: 70, texto: 'Condenser Assy' },

    { x: 580, y: 120, texto: 'In ' }, //Osmose Linha Azul
    { x: 480, y: 120, texto: 'Out ' }, 

    { x: 950, y: 255, texto: 'Freon In ' }, //Motor
    { x: 950, y: 185, texto: 'Freon Out ' }, 
    { x: 1067, y: 295, texto: 'Compressor Module ' }, 

  ];

  const posicoesInputs = [
    { x: 25, y: 280, valor: ''}, //BOX1
    { x: 163, y: 340, valor: ''},//BOX2 980, y: 400
    { x: 903, y: 410, valor: ''}, //BOX3
    { x: 640, y: 90, valor: ''}, //BO4
    { x: 1072, y: 320, valor: ''} //MOTOR
    // Adicione mais objetos conforme necessário
  ];

  // //mantem parado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dadosApi = await getDadosSensores();
        console.log('Dados recebidos:', dadosApi);
        setDados(dadosApi);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

 //TEMPO REAL
  // useEffect(() => {
  //   const atualizarDados = async () => {
  //     try {
  //       const dadosApi = await getDadosSensores();
  //       setDados(dadosApi);
  //     } catch (error) {
  //       console.error('Erro ao buscar dados:', error);
  //     }
  //   };
  
  //   const intervalId = setInterval(atualizarDados, 1300); // Atualiza a cada 1 segundo
  
  //   return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  // }, []);

  //^^^^^^^^^^^^^^^^IMPORTANTE N EXCLUIR^^^^^^^^^^^^^^^^^^^^^^

const salvarComoImagem = () => {
  return new Promise((resolve, reject) => {
    const elemento = document.getElementById('componenteParaSalvar');

    // Preserva os estilos originais
    const originalStyle = elemento.style.cssText;

    // Ajusta estilos temporários
    elemento.style.cssText += `
      position: relative !important;
      overflow: visible !important;
      transform: none !important;
      zoom: 1; /* Força o tamanho correto */
    `;

    // Captura a imagem
    html2canvas(elemento, {
      scale: window.devicePixelRatio || 1, // Melhora a qualidade
      useCORS: true,
    })
      .then((canvas) => {
        // Restaura os estilos originais
        elemento.style.cssText = originalStyle;
        // Cria e baixa a imagem
        const imagemURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imagemURL;
        link.download = 'Malha.png';
        link.click();
        resolve(); // Resolve a Promise
      })
      .catch((error) => {
        console.error('Erro ao gerar a imagem:', error);
        reject(error); // Rejeita a Promise
      });
  });
};


//CORRETA AJUDA NO INPUT

  return (
    <>
      <Fundo id="componenteParaSalvar">
        {/* Renderiza as temperaturas */}
        {dados.temperaturas.map((temp, index) => {
          const posicao = posicoesTemperaturas[index];
          if (!posicao) return null; // Ignora se não houver posição predefinida

          return (
            <div
              key={`temp-${index}`}
              style={{
                position: 'absolute',
                left: `${posicao.x}px`,
                top: `${posicao.y}px`,
                padding: '5px',
                color: 'black',
                borderRadius: '5px',
                fontSize: '14px',
                width: '100px'
              }}
            >
              <span style={{
                backgroundColor: posicao.backgroundColor,
                color: posicao.color,
                padding: '2px',
                borderRadius: '10px'
              }}>
                {posicao.texto} 
              </span>
                {temp}°C
              {/* {temp.texto} */}
              {/* T{index + 1} {temp}°C */}
            </div>
          );
        })}

        {/* Renderiza as pressões */}
        {dados.pressoes.map((pressao, index) => {
          const posicao = posicoesPressao[index];
          if (!posicao) return null; // Ignora se não houver posição predefinida

          return (
            <div
              style={{
                position: 'absolute',
                left: `${posicao.x}px`,
                top: `${posicao.y}px`,
                padding: '5px',
                color: 'black',
                borderRadius: '5px',
                fontSize: '14px',
                width: '100px'
              }}
            >
              <span style={{
                backgroundColor: posicao.backgroundColor,
                color: posicao.color,
                padding: '2px',
                borderRadius: '10px'
                
              }}>
                {posicao.texto} 
              </span>
                {pressao}°C
              {/* {temp.texto} */}
              {/* T{index + 1} {temp}°C */}
            </div>
          );
        })}

              {/* Renderiza as palavras */}
      {posicoesPalavras.map((palavra, index) => (
        <div
          key={`palavra-${index}`}
          style={{
            position: 'absolute',
            left: `${palavra.x}px`,
            top: `${palavra.y}px`,
            padding: '5px',
            color: 'black',
            fontSize: '12px',
            borderRadius: '5px',
            width: '180px'
          }}
        >
          {palavra.texto}
        </div>
      ))}

        
    {posicoesInputs.map((input, index) => (
      <textarea
        key={`input-${index}`}
        style={{
          position: 'absolute',
          left: `${input.x}px`,
          top: `${input.y}px`,
          fontSize: '10px',
          borderRadius: '2px',
          backgroundColor: '#ccc',
          border: 'none',
          // height: '14px',
          // padding: '2px',
          width: '100px',
          resize: 'none',
          overflow: 'hidden',
          lineHeight: '8px', // Alinha o texto para evitar sobreposição com o padding
        }}
      >
        {input.valor}
      </textarea>
    ))}
       
        
        
      {posicoesTimestamps.map((posicao, index) => (
        <span
          key={`timestamp-${index}`}
          style={{
            position: 'absolute',
            left: `${posicao.x}px`,
            top: `${posicao.y}px`,
            fontSize: '14px',
            color: posicao.cor,
            width: '100px'
          }}
        >
          {timestamp} 
        </span>
      ))}
      </Fundo>
      {/* <button onClick={salvarComoImagem}>Salvar e Copiar Imagens</button> */}
    </>
  );
};

export default Malha;
