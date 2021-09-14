import Header from './components/Header/Header'
import CardContainer from "./components/Cards/CardContainer";
import './language/i18next'

function App() {
  return (
    <div className="wrap">
        <Header />
        <CardContainer />
    </div>
  );
}

export default App;
