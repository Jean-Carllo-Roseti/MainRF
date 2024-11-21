import { createGlobalStyle } from 'styled-components'

export const GlobalCss = createGlobalStyle`
* {
  margin: 0 auto; /* Aqui você está sobrescrevendo o 'margin: 0 auto;' acima */
  max-width: 100%; /* Define o limite máximo de largura */
  width: 1200px; /* Define a largura fixa de 1200px */
  padding: 0; /* Remove o padding de todos os elementos */
  box-sizing: border-box; /* Inclui o padding e border no cálculo da largura */

}
  
.botao-salvar {
  position: fixed; /* Fixa a posição */
  top: 10px; /* Distância do topo */
  left: 10px; /* Distância da esquerda */
  z-index: 1000; /* Garante que fique por cima dos outros elementos */
  background-color: grey; /* Cor de fundo */
  border: none; /* Remove borda */
  padding: 5px 10px; /* Espaçamento interno */
  border-radius: 5px; /* Arredondamento das bordas */
  cursor: pointer; /* Muda o cursor para mão */
  width: 50px;
}
`
