import GraficoA from '../../assets/images/imagem.png';
import GraficoB from '../../assets/images/imagem2.png';
import GraficoC from '../../assets/images/imagem3.png';
import { OrgMolliers } from './styles';
// import html2canvas from 'html2canvas';
import React, { useState, useEffect, useCallback, useMemo, useRef  } from 'react';


const generateTimestamp = () => {
  const now = new Date();
  // Formata a data como DD/MM/YYYY
  const date = now.toLocaleDateString('pt-BR');
  // Formata a hora como HH:mm:ss
  const time = now.toLocaleTimeString('pt-BR');

  return `${date} - ${time}`;
};

const Molliers = ({ salvar, setSalvar, textAreaValues  }) => {
  const imagens = useMemo(() => [GraficoA, GraficoB, GraficoC], []);
  // eslint-disable-next-line no-unused-vars
  const [atualizar, setAtualizar] = useState(0);

  const intervalRef = useRef(null);

const salvarComoImagem = useCallback(() => {
  imagens.forEach((imagem, index) => {
    const img = new Image();
    img.src = imagem;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Define o tamanho do canvas baseado na imagem
      canvas.width = img.width;
      canvas.height = img.height + 30; // Adiciona espaço para o texto

      // Desenha a imagem no canvas
      ctx.drawImage(img, 0, 0);

      // Adiciona o texto dinâmico na mesma linha
      const timestamp = generateTimestamp();
      const textAreaValue = textAreaValues[index] || ""; // Junta os valores do textArea ou uma string vazia
      const combinedText = `SN:${textAreaValue} - Data:${timestamp}`; // Combina timestamp e valores do textarea

      ctx.font = "16px Arial";
      ctx.fillStyle = "white"; // Cor do texto
      ctx.textAlign = "center";
      ctx.fillText(combinedText, canvas.width / 2, img.height + 20); // Centraliza o texto combinado na mesma linha

      // Gera a URL da imagem com o texto
      const imagemURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.href = imagemURL;
      link.download = `imagem_${index + 1}.png`;
      link.click();
      link.remove();

      // Limpeza do canvas
      canvas.width = 0;
      canvas.height = 0;
    };
    img.onerror = () =>
      console.error(`Erro ao carregar imagem ${index + 1}`);
  });
}, [imagens, textAreaValues]);

  useEffect(() => {
    if (salvar) {
      salvarComoImagem();
      setSalvar(false);
    }
  }, [salvar, setSalvar, salvarComoImagem]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAtualizar((prev) => prev + 1);
    }, 1000); // Intervalo aumentado para 1 segundo, ajuste conforme necessário.

    return () => clearInterval(intervalRef.current); // Limpeza do intervalo
  }, []);

  return (
    <OrgMolliers id='componenteMolliersParaSalvar'>
      {imagens.map((imagem, index) => (
        <li key={index}>
          <img src={imagem} alt={`Gráfico ${index + 1}`} />
        </li>
      ))}
    </OrgMolliers>
  );
};

export default Molliers;
