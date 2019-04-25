import React, { Component } from 'react';

class User extends Component {
  render() {
    const userData = this.props.userData;
    return (
      <div className="user">
        <span>{userData.first_name}</span>
        <span>{userData.last_name}</span>
        <span>{userData.middle_name}</span>
        <span>{userData.date_of_birth}</span>
        <span>{userData.salary}</span>
        <span>{userData.department}</span>
        <span>{userData.profession}</span>
      </div>
    );
  }
}

export default User;
