import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
//import createBrowserHistory from 'history';

import './App.css';

import UserList from './components/UserList';
import AddUser from './components/AddUser';

//const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div>
          <div><Link to="user_list">User list</Link></div>
          <div><Link to="add_user">Add user</Link></div>
        </div>
        <Route path="user_list" component={UserList} />
        <Route path="add_user" component={AddUser} />
      </BrowserRouter>
    );
  }
}

export default App;
