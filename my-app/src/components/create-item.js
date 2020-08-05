import React, { Component } from 'react';
import axios from 'axios';

export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      startTime:'',
      duration: 0,
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeStartTime(e) {
    this.setState({
      startTime: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const item = {
      username: this.state.username,
      description: this.state.description,
      startTime: this.state.startTime,
      duration: this.state.duration,
    }

    console.log(item);

    axios.post('http://localhost:5000/list/add', item)
      .then(res => console.log(res.data));

      this.setState({
        username: '',
        description:'',
        startTime:'',
        duration:0
      })
  }

  render() {
    return (
    <div>
      <h3>Create New Item</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Starting Time: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.startTime}
              onChange={this.onChangeStartTime}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Item" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}