import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { getDadosSensores } from '../../services/axiosDados';
import { Fundo,
   Relogio,
   CampoInput,
   PalavrasDiv,
   ConteudoPalvras,
   TemperaturaDiv,
   TemperaturaTexto,
   PressaoDiv,
   PressaoTexto,
   TemperaturaValor,
   PressaoValor } from './styles';

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

const Malha = ({ salvar, setSalvar, setTextAreaValues  }) => {
  const [dados, setDados] = useState({ temperaturas: [], pressoes: [] });
  const [salvando, setSalvando] = useState(false);
  const [timestamp, setTimestamp] = useState(getTimestamp());
  const [serieNumber, setSerieNumber] = useState(["", ""]);

  const handleInputChange = (index, value) => {
    const novosDados = [...serieNumber];
    novosDados[index] = value; // Atualiza o valor do índice específico
    setSerieNumber(novosDados); // Atualiza o estado local
    setTextAreaValues(novosDados); // Passa os dados para o componente pai
  };

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
    { x: 130, y: 140, texto: 'T1',}, //T1 BOX1
    { x: 130, y: 230, texto: 'T2', }, //T2
    { x: 20, y: 110, texto: 'T3', }, //T3
    { x: 20, y: 140, texto: 'T4', }, //T4
    { x: 30, y: 235, texto: 'TEO', }, //T5  
    { x: 280, y: 280, texto: 'T6', }, //T6 BOX2
    { x: 280, y: 400, texto: 'T7', }, //T7 
    { x: 180, y: 400, texto: 'TEO', }, //T8
    { x: 355, y: 350, texto: 'T9', }, //T9
    { x: 355, y: 310, texto: 'T10', }, //T10
    { x: 764, y: 322, texto: 'T11', }, //T11 BOX 3
    { x: 764, y: 384, texto: 'T12', }, //T12
    { x: 720, y: 410, texto: 'TEO', }, //T13
    { x: 610, y: 290, texto: 'T14',}, //T14
    { x: 610, y: 320, texto: 'T15', }, //T15
    { x: 580, y: 225, texto: 'T16', }, //T16 BOX 4
    { x: 705, y: 250, texto: 'T17', }, //T17
    { x: 705, y: 135, texto: 'T18', }, //T18
    { x: 820, y: 195, texto: 'T19', }, //T19
    { x: 885, y: 100, texto: 'TF', }, //T20
    { x: 930, y: 210, texto: 'T21', }, //T21 LINHA ROSA
    { x: 930, y: 280, texto: 'T22', }, //T22 LINHA VERDE
    { x: 1090, y: 260, texto: 'TC', }, //T23 COMPRESSOR
    { x: 1090, y: 120, texto: 'TM', }, //T24 MOTOR
    { x: 520, y: 105, texto: 'T25', }, //T25 
    // { x: 150, y: 200 }, //T26
  ];

  const posicoesPressao = [
    { x: 130, y: 110, texto: 'P1' }, //P1 BOX1
    { x: 130, y: 200, texto: 'P2' }, //P2
    { x: 280, y: 250, texto: 'P3' }, //P3 BOX2
    { x: 280, y: 375, texto: 'P4' }, //P4
    { x: 764, y: 292, texto: 'P5' }, //P5 BOX3
    { x: 764, y: 355, texto: 'P6' }, //P6
    { x: 580, y: 195, texto: 'P7' }, //P7 BOX4
    { x: 930, y: 170, texto: 'P8' }, //P8
    { x: 930, y: 240, texto: 'P9' }, //P9
    // { x: 100, y: 50 }, //P10
  ];

  const posicoesPalavras = [
    { x: 120, y: 10, texto: 'Suction - Gasous Freon' }, //info Legenda Malha
    { x: 120, y: 33, texto: 'Pressure - Gasous Freon' },
    { x: 120, y: 55, texto: 'Pressure - Liquidi Freon' }, 
    { x: 463, y: 25, texto: 'P2, P4, P6, P7, P8 SB69-500V' },
    { x: 463, y: 45, texto: 'P1, P3, P5, P9 SB69-100V' }, 
    { x: 463, y: 5, texto: 'Sensor of Temperature TF43' }, 
    { x: 40, y: 95, texto: 'Air In' }, //BOX 1
    { x: 40, y: 125, texto: 'Air Out' },
    { x: 245, y: 115, texto: 'Out Refr' },
    { x: 285, y: 205, texto: 'In Refr' },
    { x: 20, y: 260, texto: 'Evaporator Module' }, 

    { x: 380, y: 295, texto: 'Air Out' }, //BOX2
    { x: 380, y: 335, texto: 'Air In' }, 
    { x: 155, y: 320, texto: 'Evaporator Module' }, 

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
    { x: 155, y: 340, valor: ''},//BOX2 
    { x: 903, y: 410, valor: ''}, //BOX3
    { x: 640, y: 90, valor: ''}, //BO4
    { x: 1072, y: 320, valor: ''} //MOTOR
    // Adicione mais objetos conforme necessário
  ];

 //TEMPO REAL
  useEffect(() => {
    const atualizarDados = async () => {
      try {
        const dadosApi = await getDadosSensores();
        setDados(dadosApi);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    const intervalId = setInterval(atualizarDados, 1300); // Atualiza a cada 1 segundo
  
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

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

  return (
    <>
      <Fundo id="componenteParaSalvar">
        {/* Renderiza as temperaturas */}
        {dados.temperaturas.map((temp, index) => {
        const posicao = posicoesTemperaturas[index];
        if (!posicao) return null; // Ignora se não houver posição predefinida

        return (
          <TemperaturaDiv
            key={`temp-${index}`}
            left={posicao.x}
            top={posicao.y}
          >
            <TemperaturaTexto>{posicao.texto}</TemperaturaTexto>
            <TemperaturaValor>{temp}°C</TemperaturaValor>
          </TemperaturaDiv>
        );
      })}

        {/* Renderiza as pressões */}
        {dados.pressoes.map((pres, index) => {
        const posicao = posicoesPressao[index];
        if (!posicao) return null; // Ignora se não houver posição predefinida

        return (
          <PressaoDiv
            key={`pres-${index}`}
            left={posicao.x}
            top={posicao.y}
          >
            <PressaoTexto>{posicao.texto}</PressaoTexto>
            <PressaoValor>{pres}°C</PressaoValor>
          </PressaoDiv>
        );
      })}

      {posicoesPalavras.map((posicao, index) => (
        <PalavrasDiv
          key={`input-${index}`}
          style={{ position: 'absolute', left: `${posicao.x}px`, top: `${posicao.y}px` }}
        >
          <ConteudoPalvras>{posicao.texto}</ConteudoPalvras>
        </PalavrasDiv>
      ))}
        
      {posicoesInputs.map((posicao, index) => (
        <CampoInput
          key={`input-${index}`}
          style={{ position: 'absolute', left: `${posicao.x}px`, top: `${posicao.y}px` }}
          value={serieNumber[index] || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
        
      {posicoesTimestamps.map((posicao, index) => (
        <Relogio
          key={`timestamp-${index}`}
          style={{
            left: `${posicao.x}px`,
            top: `${posicao.y}px`,
          }}
        >
          {timestamp} 
        </Relogio>
      ))}
      </Fundo>
    </>
  );
};

export default Malha;
