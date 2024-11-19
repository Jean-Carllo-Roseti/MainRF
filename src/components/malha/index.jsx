import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { getDadosSensores } from '../../services/axiosDados';
import { Fundo } from './styles';

const Malha = ({ salvar,setSalvar }) => {
  const [dados, setDados] = useState({ temperaturas: [], pressoes: [] });
  const [salvando, setSalvando] = useState(false);

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
    { x: 400, y: 100 }, //T1
    { x: 150, y: 200 }, //T2
    { x: 250, y: 300 }, //T3
    { x: 350, y: 400 }, //T4
    { x: 400, y: 100 }, //T5
    // { x: 150, y: 200 }, //T6
    // { x: 250, y: 300 }, //T7
    // { x: 350, y: 400 }, //T8
    // { x: 400, y: 100 }, //T9
    // { x: 150, y: 200 }, //T10
    // { x: 250, y: 300 }, //T11
    // { x: 350, y: 400 }, //T12
    // { x: 400, y: 100 }, //T13
    // { x: 150, y: 200 }, //T14
    // { x: 250, y: 300 }, //T15
    // { x: 350, y: 400 }, //T16
    // { x: 400, y: 100 }, //T17
    // { x: 150, y: 200 }, //T18
    // { x: 250, y: 300 }, //T19
    // { x: 350, y: 400 }, //T20
    // { x: 400, y: 100 }, //T21
    // { x: 150, y: 200 }, //T22
    // { x: 250, y: 300 }, //T23
    // { x: 350, y: 400 }, //T24
    // { x: 400, y: 100 }, //T25
    // { x: 150, y: 200 }, //T26
    // { x: 250, y: 300 }, //T27
    // { x: 350, y: 400 }, //T28
    // Adicione mais posições conforme necessário
  ];

  const posicoesPressao = [
    { x: 100, y: 50 }, //P1
    { x: 200, y: 150 }, //P2
    { x: 300, y: 250 }, //P3
    // { x: 100, y: 50 }, //P4
    // { x: 200, y: 150 }, //P5
    // { x: 300, y: 250 }, //P6
    // { x: 100, y: 50 }, //P7
    // { x: 200, y: 150 }, //P8
    // { x: 300, y: 250 }, //P9
    // { x: 100, y: 50 }, //P10
  ];

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


  const salvarComoImagem = () => {
    return html2canvas(document.getElementById('componenteParaSalvar')).then((canvas) => {
      const imagemURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imagemURL;
      link.download = 'componente.png';
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
              }}
            >
              P{index + 1} {pressao} PSI
            </div>
          );
        })}
      </Fundo>
      {/* <button onClick={salvarComoImagem}>Salvar e Copiar Imagens</button> */}
    </>
  );
};

export default Malha;

