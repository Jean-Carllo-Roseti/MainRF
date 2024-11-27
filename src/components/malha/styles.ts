import styled from "styled-components";
import Indicadores from "./types";

import FotoMalha from '../../assets/images/FotoMalha.png'

export const Fundo = styled.div`
  background-image: url(${FotoMalha});
  background-size: cover;   /* Manter a proporção sem distorção */
  width: 1400px;
  height: 438px;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
`;

export const TemperaturaDiv = styled.div<Indicadores>`
  position: absolute;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  display: flex;
  backgounde-color: #000;
  align-items: center;
  border-radius: 8px;
  width: 50px;
`;

export const TemperaturaTexto = styled.span<Indicadores>`
  font-size: 12px; 
  // font-weight: bold;
  background-color: #000;
  padding: 2px;
  border-radius: 18px;
  color: #fff;
`;

export const TemperaturaValor = styled.span<Indicadores>`
  font-size: 14px; /* Fonte para os valores de temperatura */
  font-weight: bold;
  color: #000; /* Vermelho para destaque */
  margin-left: 4px;
`;

export const PressaoDiv = styled.div<Indicadores>`
  position: absolute;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  display: flex;
  backgounde-color: #000;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  width: 50px;
`;

export const PressaoTexto = styled.span<Indicadores>`
  font-size: 12px; 
  background-color: #000;
  padding: 2px;
  border-radius: 18px;
  color: #fff;
`;

export const PressaoValor = styled.span<Indicadores>`
  font-size: 14px; /* Fonte para os valores de temperatura */
  font-weight: bold;
  color: #000; /* Vermelho para destaque */
  margin-left: 4px;
`;

export const CampoInput = styled.input`
  width: 120px;
  background-color: #ccc;
  border-radius: 4px;
`

export const PalavrasDiv = styled.div`
  position: 'absolute';
  padding: 1px;
  border-radius: 4px;
  width: 180px;
`
export const ConteudoPalvras = styled.p`
  font-size: 14px;
  font-weight: bold;
`

export const Relogio = styled.span`
  position: absolute;
  font-size: 14px;
  width: 100px
`