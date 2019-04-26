import React, { Component } from 'react';

import axios from 'axios';

class AddUser extends Component {
  removeRecord(id) {
    this.dispatchUpdateOnParrent();
    axios.post('./remove_users', {
      user_id: id,
    }).then((res) => {
      this.setState({
        users: res.data,
      })
    })
  }
  dispatchUpdateOnParrent(){
    this.props.updateRecords();
  }
  onClick() {
    const userID = this.props.userData._id;
    this.removeRecord(userID);
  }
  render() {
    const userData = this.props.userData;
    return (
      <div className="user-form">
        <div className="input"><span>{userData.first_name}</span></div>
        <div className="input"><span>{userData.last_name}</span></div>
        <div className="input"><span>{userData.middle_name}</span></div>
        <div className="input"><span>{userData.date_of_birth}</span></div>
        <div className="input"><span>{userData.salary}</span></div>
        <div className="input"><span>{userData.department}</span></div>
        <div className="input"><span>{userData.profession}</span></div>
        <div className="input"><button onClick={this.onClick}></button></div>
      </div>
    );
  }
}

export default AddUser;
