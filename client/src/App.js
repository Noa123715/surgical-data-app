import { BrowserRouter } from 'react-router-dom';
import Main from './component/main.js'
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
