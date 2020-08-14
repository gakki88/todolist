import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import ItemsList from "./components/items-list";
import CreateItem from "./components/create-item";
import CreateUser from "./components/create-user";
import EditItem from "./components/edit-item";

function App() {
  return (
    <Router>
      <div className="container">
      <Header />
      <br/>
      <Route path="/" exact component={ItemsList} />
      <Route path="/create" component={CreateItem} />
      <Route path="/user" component={CreateUser} />
      <Route path="/edit/:id" component={EditItem}></Route>
      </div>
    </Router>
  );
}

export default App;
