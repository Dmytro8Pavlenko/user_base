import React, { Component } from 'react';

import axios from 'axios';

class User extends Component {
  removeRecord(id) {
    axios.post('./remove_users', {
      user_id: id,
    }).then(() => {
      this.dispatchUpdateOnParrent();
    })
  }
  dispatchUpdateOnParrent() {
    this.props.updateRecords();
  }
  onClick() {
    const userID = this.props.userData._id;
    this.removeRecord(userID);
  }
  render() {
    const userData = this.props.userData;
    return (
      <div className="user row">
        <div className="column"><span>{userData.first_name}</span></div>
        <div className="column"><span>{userData.last_name}</span></div>
        <div className="column"><span>{userData.middle_name}</span></div>
        <div className="column"><span>{userData.date_of_birth}</span></div>
        <div className="column"><span>{userData.salary}</span></div>
        <div className="column"><span>{userData.department}</span></div>
        <div className="column"><span>{userData.profession}</span></div>
        <div className="column"><button onClick={this.onClick}>Remove</button></div>
      </div>
    );
  }
}

export default User;
