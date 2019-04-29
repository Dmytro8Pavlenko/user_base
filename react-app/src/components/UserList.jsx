import React, { Component } from 'react';
import axios from 'axios';

import User from './User.jsx';
import FilterFields from './FilterFields.jsx';

const fieldNames = {
  _id: 'id',
  first_name: 'First name',
  last_name: 'Last name',
  middle_name: 'Middle name',
  date_of_birth: 'Age',
  salary: 'Salary',
  department: 'Department',
  profession: 'Profession',
};


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterString: '',
      users: [],
      page: 1,
      sort_by_field: '_id',
      direction: 1,
      pageCount: 0,
    }
  };
  updateRecords = () => {
    axios.get(`./users/${this.state.page}/${this.state.sort_by_field}/${this.state.direction}/${this.state.filterString}`).then(this.handleResponse);
  };

  handleResponse = (res) => {
    console.log('res.data', res.data);

    this.setState({
      users: res.data || [],
      page: +res.headers['page-number'],
      pageCount: +res.headers['pagination-count'],
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
    return number === this.state.page;
  }

  onFilterChange = (filterData) => {
    let filterString = '';
    if (filterData) {
      filterString = '?'
      for (let key in filterData) {
        if (filterData[key]) {
          filterString += `${key}=${filterData[key]}&`
        };
      };
    }
    console.log('filterString', filterString);
    this.setState(
      {
        filterString,
      }, this.updateRecords
    );
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
            <FilterFields onChange={this.onFilterChange} />
          </div>
          <div className="sort-options">
            <p>Sort</p>
            {fieldSortOptions}
          </div>
          <div className="sort-direction">
            <p></p>
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
