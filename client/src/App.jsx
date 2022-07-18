import { EthProvider } from "./contexts/EthContext";
import './index.css';
import Main from "./components/Main";


function App() {

  return (
    <EthProvider>
      <div id="App" className="text-white h-screen">
        <Main />
      </div>
    </EthProvider>
  );
}

export default App;