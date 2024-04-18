import "./App.css";
import Providers from "./providers";
import RoutesWrapper from "./routes";

function App() {
  return (
    <Providers>
      <div className="App">
        <RoutesWrapper />
      </div>
    </Providers>
  );
}

export default App;
