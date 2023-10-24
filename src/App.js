import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Home from "./pages/Home";

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <Home />
      </div>
    </ReduxProvider>
  );
}

export default App;
