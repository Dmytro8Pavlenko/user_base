import React, { Component } from 'react';

import axios from 'axios';

class AddUser extends Component {
  addRecord(data) {

    axios.post('./users', {
      ...data,
      salary: +this.state.salary,
      date_of_birth: new Date(this.state.date_of_birth)
    }).then((res) => {
      console.log('added');
    });
  }

  onFieldChange(fieldName) {
    return (e) => {
      const value = e.target.value;
      this.setState({
        [fieldName]: value,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.addRecord(this.state);
  }

  render() {
    return (
      <form className="user-form" onSubmit={this.onSubmit}>
        <div className="row"><span>first-name</span><input type="text" className="first-name" onChange={this.onFieldChange('first_name')} required /></div>
        <div className="row"><span>last-name</span><input type="text" className="last-name" onChange={this.onFieldChange('last_name')} required /></div>
        <div className="row"><span>middle-name</span><input type="text" className="middle-name" onChange={this.onFieldChange('middle_name')} required /></div>
        <div className="row"><span>date-of-birth</span><input type="date" className="date-of-birth" onChange={this.onFieldChange('date_of_birth')} required /></div>
        <div className="row"><span>salary</span><input type="number" className="salary" onChange={this.onFieldChange('salary')} required /></div>
        <div className="row"><span>department</span><input type="text" className="department" onChange={this.onFieldChange('department')} required /></div>
        <div className="row"><span>profession</span><input type="text" className="profession" onChange={this.onFieldChange('profession')} required /></div>
        <div className="row"><div className="input"><button>Add user</button></div></div>
      </form>
    );
  }
}

export default AddUser;
