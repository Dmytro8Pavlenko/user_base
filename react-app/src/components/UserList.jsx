import React, { Component } from 'react';
import axios from 'axios';

import User from './User.jsx';

const fieldNames = {
  _id: 'id',
  first_name: 'First name',
  last_name: 'Last name',
  middle_name: 'Middle name',
  date_of_birth: 'Date of birth',
  salary: 'Salary',
  department: 'Department',
  profession: 'Profession',
};


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      sort_by_field: '_id',
      direction: 1,
      pageCount: 0,
    }
  };
  updateRecords = () => {
    axios.get(`./users/${this.state.page}/${this.state.sort_by_field}/${this.state.direction}`).then(this.handleResponse)
  };

  handleResponse = (res) => {
    this.setState({
      users: res.data,
      pageCount: res.headers['pagination-count'],
    })
  };
  componentWillMount = () => {
    this.updateRecords();
  };

  onClickOnPage = (page) => (e) => {
    e.preventDefault();
    this.setState({
      page
    }, this.updateRecords);
  }
  onClickOnSortOption = (sort_by_field) => (e) => {
    this.setState({
      sort_by_field
    }, this.updateRecords);
  }
  onClickOnSortDirectionOption = (direction) => (e) => {
    this.setState({
      direction
    }, this.updateRecords);
  }
  isCurrent(number) {
    const newPage = this.state.page > this.state.pageCount ? this.state.pageCount : this.state.page;
    return number === newPage;
  }

  render() {
    const userList = this.state.users.map((item) => (
      <User updateRecords={this.updateRecords} userData={item} key={item._id} />
    ));
    const pageLinks = [];
    for (let i = 1; i <= this.state.pageCount; i++) {
      pageLinks.push(
        <a href="" className={this.isCurrent(i) && "current"} onClick={this.onClickOnPage(i)}>{i} </a>
      )
    }

    const fieldSortOptions = [];
    for (let key in fieldNames) {
      fieldSortOptions.push(
        <p>
          <input id={key} name="sort_field" type="radio" checked={key === this.state.sort_by_field} value={key} onClick={this.onClickOnSortOption(key)} />
          <label for={key}>{fieldNames[key]}</label>
        </p>
      )
    }

    return (
      <div>
        <div className="sort-selection">
          <div>
            {fieldSortOptions}
          </div>
          <div>
            <p>
              <input id="sortDown" name="sort_direction" type="radio" value={1} onClick={this.onClickOnSortDirectionOption(1)} checked={this.state.direction === 1} />
              <label for="sortDown">Sort down</label>
            </p>
            <p>
              <input id="sortUp" name="sort_direction" type="radio" value={-1} onClick={this.onClickOnSortDirectionOption(-1)} checked={this.state.direction === -1} />
              <label for="sortUp">Sort up</label>
            </p>
          </div>
        </div>
        <div className="user-list">
          {userList}
        </div>
        <div>
          {pageLinks}
        </div>
      </div>
    );
  };
};

export default UserList;
