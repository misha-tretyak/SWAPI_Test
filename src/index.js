import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ProtectedRoute } from './Authorization/ProtectedRoute';
import { Login } from './pages/Login';
import { MainPage } from './pages/MainPage';
import { AllPeople } from './pages/AllPeople';
import { Profile } from './pages/Profile';
import { LikedList } from './pages/LikedList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact component={Login} path='/login' />
        <ProtectedRoute exact path='/' component={MainPage} />
        <ProtectedRoute exact path='/all' component={AllPeople} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/liked' component={LikedList} />
        <Route path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />    
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
