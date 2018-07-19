import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import '../css/search.css';
import logo from '../img/logo.png';
import '../js/fontawesome-all.js';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleChange(e){
    const value = e.target.value;
    this.setState({
      inputValue: value
    })
  }

  render() {
    const match = this.props.match;
    const redirect = "/search/" + this.state.inputValue;
    return (
      <div className="search">
        <Link to='/'>
      	 <img src={logo} className="logo"></img>
        </Link>
      	<form className="formSearch" method="get">
      		<input type="text" onChange={this.handleChange.bind(this)} placeholder="Nunca dejes de buscar" name="search" className="inputSearch" value={this.state.inputValue}></input>
          <Link to={redirect} className="searchButton">
        		<button type="submit">
        			<i className="fas fa-search"></i>
        		</button>
          </Link>
      	</form>
      </div>
    );
  }
}

export default Search;