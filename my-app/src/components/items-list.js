import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Item = props => (
  <tr>
    <td>{props.item.username}</td>
    <td>{props.item.description}</td>
    <td>{props.item.startTime}</td>
    <td>{props.item.duration}</td>
    <td>
      <Link to={"/edit/"+props.item._id} className="nav-link">edit</Link>
    </td>
    <td>
      <button onClick={() => { props.deleteItem(props.item._id) }}>delete</button>
    </td>
  </tr>
)

export default class ItemsList extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this)

    this.state = {items: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/list/')
      .then(response => {
        this.setState({ items: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteItem(id) {
    axios.delete('http://localhost:5000/list/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      items: this.state.items.filter(el => el._id !== id)
    })
  }

  editItem(id){
    axios.post('http://localhost:5000/list/update'+id)
      .then()
  }

  List() {
    return this.state.items.map(currentItem => {
      return <Item item={currentItem} deleteItem={this.deleteItem} key={currentItem._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>To do items</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Edit Item</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            { this.List() }
          </tbody>
        </table>
      </div>
    )
  }
}