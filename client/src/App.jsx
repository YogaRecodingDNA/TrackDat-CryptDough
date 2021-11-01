import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CoinMarket from './components/pages/coinMarket/CoinMarket';
import CuratedList from './components/pages/curatedList/CuratedList';
// import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/coins'>
            <CoinMarket />
          </Route>
          <Route path='/myList'>
            <CuratedList />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
