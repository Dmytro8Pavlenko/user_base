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
  updateRecords(page = 1) {
    axios.post('./get_users', {
      page: page,
    }).then(this.handleResponse)
  };

  handleResponse(res) {
    this.setState({
      users: res.data,
    })
  };
  componentWillMount = () => {
    this.updateRecords();
  };

  render() {
    const userList = this.state.users.map((item) => (
      <User userData={item} key={item._id} />
    ));
    return (
      <div className="user-list">
        {userList}
      </div>
    );
  };
};

export default UserList;
