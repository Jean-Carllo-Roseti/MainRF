import styled from "styled-components";

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
