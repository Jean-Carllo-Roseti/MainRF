import React, { useEffect, useState } from 'react';
import { getDadosSensores } from '../../services/axiosDados'; // Importa a função para obter os dados da API
import { Fundo } from './styles'; // Assume que você tem um componente de estilo para o fundo

const Malha = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dadosApi = await getDadosSensores(); // Chama a função para buscar os dados
      console.log('Dados recebidos:', dadosApi); // Verifique no console o que está sendo recebido
      setDados(dadosApi); // Atualiza o estado com os dados recebidos
    };

    fetchData();
  }, []);

  if (!dados) {
    return <div>Carregando...</div>;
  }

  // Definindo as posições para as temperaturas
  const posicoesTemperaturas = dados.temperaturas.map((temp, index) => ({
    x: (index % 5) * 100,  // Posição X
    y: Math.floor(index / 5) * 50,  // Posição Y
    valor: temp,
  }));

  // Definindo as posições para as pressões
  const posicoesPressao = dados.pressoes.map((pressao, index) => ({
    x: (index % 3) * 150,  // Posição X
    y: Math.floor(index / 3) * 75,  // Posição Y
    valor: pressao,
  }));

  return (
    <Fundo>
      {posicoesTemperaturas.map((temp, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${temp.x}px`,
            top: `${temp.y}px`,
            backgroundColor: 'blue',
            padding: '5px',
            color: 'white',
            borderRadius: '5px',
          }}
        >
          Temp: {temp.valor}°C
        </div>
      ))}
      {posicoesPressao.map((pressao, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${pressao.x}px`,
            top: `${pressao.y}px`,
            backgroundColor: 'green',
            padding: '5px',
            color: 'white',
            borderRadius: '5px',
          }}
        >
          Pressão: {pressao.valor} bar
        </div>
      ))}
    </Fundo>
  );
};

export default Malha;
