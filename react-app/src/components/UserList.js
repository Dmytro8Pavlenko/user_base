import React, { Component } from 'react';
import axios from 'axios';

import User from './User';



class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  };
  getUsers() {
    axios.post('./get_users', {
      page: 1,
    }).then((res) => {
      this.setState({
        users: res.data,
      })
    })
  }
  componentWillMount = () => {
    this.getUsers();
  };

  render() {
    const userList = this.state.users.map((item) => (
      <User userData={item} />
    ));
    return (
      <div className="user-list">
        {userList}
      </div>
    );
  };
};

export default UserList;
