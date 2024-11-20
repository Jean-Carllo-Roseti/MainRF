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
    { x: 1195, y: 410 },
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

  // useEffect(() => {
  //   if (salvar) {
  //     salvarComoImagem();
  //     setSalvar(false);
  //   }
  // }, [salvar, setSalvar]);

  // Posições fixas para cada valor
  const posicoesTemperaturas = [
    { x: 205, y: 160 }, //T1 BOX1
    { x: 205, y: 242 }, //T2
    { x: 100, y: 255 }, //T3
    { x: 100, y: 160 }, //T4
    { x: 100, y: 130 }, //T5 
    { x: 380, y: 300 }, //T6 BOX2
    { x: 380, y: 420 }, //T7 
    { x: 270, y: 420 }, //T8
    { x: 430, y: 365 }, //T9
    { x: 430, y: 330 }, //T10
    { x: 835, y: 340 }, //T11 BOX 3
    { x: 835, y: 400 }, //T12
    { x: 750, y: 428 }, //T13
    { x: 680, y: 310 }, //T14
    { x: 680, y: 335 }, //T15
    { x: 650, y: 238 }, //T16 BOX 4
    { x: 780, y: 270 }, //T17
    { x: 780, y: 160 }, //T18
    { x: 890, y: 215 }, //T19
    { x:965 , y: 130 }, //T20
    { x: 1000, y: 230 }, //T21 LINHA ROSA
    { x: 1000, y: 295 }, //T22 LINHA VERDE
    { x: 1160, y: 270 }, //T23 COMPRESSOR
    { x: 1160, y: 140 }, //T24 MOTOR
    { x: 570, y: 125 }, //T25 
    // { x: 150, y: 200 }, //T26
  ];

  const posicoesPressao = [
    { x: 205, y: 132 }, //P1 BOX1
    { x: 205, y: 220 }, //P2
    { x: 380, y: 260 }, //P3 BOX2
    { x: 380, y: 390 }, //P4
    { x: 835, y: 315 }, //P5 BOX3
    { x: 835, y: 370 }, //P6
    { x: 650, y: 215 }, //P7 BOX4
    { x: 1000, y: 190 }, //P8
    { x: 1000, y: 260 }, //P9
    // { x: 100, y: 50 }, //P10
  ];


  const posicoesPalavras = [
    { x: 190, y: 23, texto: 'Suction - Gasous Freon' }, //info Legenda Malha
    { x: 190, y: 47, texto: 'Pressure - Gasous Freon' },
    { x: 190, y: 70, texto: 'Pressure - Liquidi Freon' }, 
    { x: 550, y: 65, texto: 'P2, P4, P6, P7, P8 SB69-500V' },
    { x: 550, y: 45, texto: 'P1, P3, P5, P9 SB69-100V' }, 
    { x: 549, y: 26, texto: 'Sensor de Temperatura TF43' }, 
    { x: 125, y: 120, texto: 'Air In' }, //BOX 1
    { x: 125, y: 150, texto: 'Air Out' },
    { x: 320, y: 138, texto: 'Out Refr' },
    { x: 360, y: 225, texto: 'In Refr' },
    { x: 105, y: 280, texto: 'Evaporator Module' }, 

    { x: 450, y: 318, texto: 'Air Out' }, //BoOX2
    { x: 450, y: 350, texto: 'Air In' }, 
    { x: 235, y: 350, texto: 'Evaporator Module' }, 

    { x: 710, y: 298, texto: 'Air In' }, //BOX3
    { x: 710, y: 325, texto: 'Air Out' }, 
    { x: 980, y: 400, texto: 'Evaporator Module' }, 
    { x: 610, y: 410, texto: 'In Refr' }, 
    { x: 900  , y: 275, texto: 'Out Refr' }, 

    { x: 900, y: 200, texto: 'Air In' }, //BOX4
    { x: 800, y: 255, texto: 'Temp In' }, 
    { x: 800, y: 148, texto: 'Temp Out' }, 
    { x: 730, y: 90, texto: 'Condenser Assy' },

    { x: 630, y: 145, texto: 'In ' }, //Osmose Linha Azul
    { x: 550, y: 145, texto: 'Out ' }, 

    { x: 1025, y: 275, texto: 'Freon In ' }, //Motor
    { x: 1025, y: 205, texto: 'Freon Out ' }, 
    { x: 1150, y: 295, texto: 'Compressor Module ' }, 

  ];

  const posicoesInputs = [
    { x: 20, y: 280}, //BOX1
    { x: 150, y: 350 },//BOX2 980, y: 400
    { x: 900, y: 400 }, //BOX3
    { x: 640, y: 90 }, //BO4
    { x: 1072, y: 295, } //MOTOR
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

  const salvarComoImagem = () => {
    return html2canvas(document.getElementById('componenteParaSalvar')).then((canvas) => {
      const imagemURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imagemURL;
      link.download = 'Malha.png';
      link.click();
    });
  };


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
                backgroundColor: 'transparent',
                padding: '5px',
                color: 'black',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              T{index + 1} {temp}°C
            </div>
          );
        })}

        {/* Renderiza as pressões */}
        {dados.pressoes.map((pressao, index) => {
          const posicao = posicoesPressao[index];
          if (!posicao) return null; // Ignora se não houver posição predefinida

          return (
            <div
              key={`pressao-${index}`}
              style={{
                position: 'absolute',
                left: `${posicao.x}px`,
                top: `${posicao.y}px`,
                backgroundColor: 'transparent',
                padding: '5px',
                color: 'black',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              P{index + 1} {pressao} PSI
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
            backgroundColor: 'transparent',
            padding: '5px',
            color: 'black',
            fontSize: '12px',
            borderRadius: '5px',
          }}
        >
          {palavra.texto}
        </div>
      ))}

      <div style={{ position: 'relative' }}>
          {posicoesInputs.map((input, index) => (
            <input
              key={`input-${index}`}
              style={{
                position: 'absolute',
                left: `${input.x}px`,
                top: `${input.y}px`,
                padding: '2px',
                fontSize: '10px',
                borderRadius: '2px',
                backgroundColor: '#ccc',
                border: 'none', //1px solid #ccc',
                width: '120px'
              }}
              type="text"
              placeholder={input.placeholder}
            />
          ))}
        </div>
        
        
      {posicoesTimestamps.map((posicao, index) => (
        <span
          key={`timestamp-${index}`}
          style={{
            position: 'absolute',
            left: `${posicao.x}px`,
            top: `${posicao.y}px`,
            fontSize: '14px',
            color: posicao.cor
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

