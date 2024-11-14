import Malha from "./components/malha/index.jsx";
import Molliers from "./components/molliers/index.jsx";
import { GlobalCss } from "./styles.tsx";


function App() {
  return (
    <>
    <GlobalCss />
    <div className="App">
      <Malha />
      <Molliers />
    </div>
    </>
  );
}

export default App;
