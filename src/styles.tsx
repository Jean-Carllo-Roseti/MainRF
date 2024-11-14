import { createGlobalStyle } from 'styled-components'

export const GlobalCss = createGlobalStyle`
* {
  margin: 0 auto; /* Aqui você está sobrescrevendo o 'margin: 0 auto;' acima */
  max-width: 100%; /* Define o limite máximo de largura */
  width: 1200px; /* Define a largura fixa de 1200px */
  padding: 0; /* Remove o padding de todos os elementos */
  box-sizing: border-box; /* Inclui o padding e border no cálculo da largura */
}

`
