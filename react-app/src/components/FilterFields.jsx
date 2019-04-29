import React, { Component } from 'react';

import axios from 'axios';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 500,
            first_name: '',
            last_name: '',
            middle_name: '',
            salary: '',
            department: '',
            profession: '',
        }
    }

    emitChange = () => {
        const filterData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            middle_name: this.state.middle_name,
            salary: this.state.salary,
            department: this.state.department,
            profession: this.state.profession,
        }
        console.log('filterData', filterData);
        
        this.props.onChange(filterData);
    }


    startTimer() {
        console.log('startTimer');
        
        this.setState({
            timer: setTimeout(this.emitChange, this.state.timeout)
        })
    }

    cleanTimer() {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }
    }

    onFieldChange(fieldName) {
        
        return (e) => {
            console.log('onFieldChange');
            this.cleanTimer();
            const value = e.target.value;
            this.setState({
                [fieldName]: value,
            }, this.startTimer());
        }
    }



    render() {
        return (
            <form className="user-form">
                <div className="row"><p>Filter</p></div>
                <div className="row"></div>
                <div className="row"><input type="text" className="first-name" onChange={this.onFieldChange('first_name')}/></div>
                <div className="row"><input type="text" className="last-name" onChange={this.onFieldChange('last_name')}/></div>
                <div className="row"><input type="text" className="middle-name" onChange={this.onFieldChange('middle_name')}/></div>
                <div className="row">{/* <input type="date" className="date-of-birth" onChange={this.onFieldChange('date_of_birth')} required /> */}</div>
                <div className="row"><input type="number" className="salary" onChange={this.onFieldChange('salary')}/></div>
                <div className="row"><input type="text" className="department" onChange={this.onFieldChange('department')}/></div>
                <div className="row"><input type="text" className="profession" onChange={this.onFieldChange('profession')}/></div>
            </form>
        );
    }
}

export default AddUser;
