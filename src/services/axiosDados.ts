import axiosInstance from './axiosInstance';

const getDadosSensores = async () => {
  try {
    const resposta = await axiosInstance.get('http://127.0.0.1:5000/dados-sensores');
    console.log('Resposta da API:', resposta.data); // Ve
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar dados da API:', erro);
    return null;
  }
};

export { getDadosSensores };
