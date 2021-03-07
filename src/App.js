import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch ,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          {/* <Navbar/> */}
            <Switch>
              <Route path='/' exact component={Home}/>
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
