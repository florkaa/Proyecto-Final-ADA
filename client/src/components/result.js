import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/result.css';
import '../js/fontawesome-all.js';
import Search from '../components/search';
import {Breadcrumb} from '../components/breadcrumb';
import envio from '../img/ic_shipping@2x.png.png.png'

class Result extends Component {
  constructor(props){
    super(props);
    this.state = {
      results : [],
      filters: []
    }
  }
    async componentDidMount() {
    const listId = this.props.match.params.id;
    const api = await fetch(`http://localhost:3001/api/items?q=${listId}`);
    const json = await api.json();
    this.setState({ results: json[0].items, filters: json[0].categories});
    console.log(json)
  }

  render() {
    return (
      <div>
        <Search/>
        <Breadcrumb filters={this.state.filters}/>
        <div className="resultadoBusqueda">
          {this.state.results.map((result, i) => {
            return (
              <Link key={i} to={"/items/" + result.id} >
              	<div className="item">
                	<div className="img">
                		<img src={result.picture} className="productoIMG"></img>
              		</div>
                	<div className="descripcionBusqueda">
                		<p className="precio">
              				{result.price}
          				    <span className="envio"> 
                        {result.free_shipping === true && (
                          <img src={envio}></img>
                        )}
                		  </span>
                		</p>
                		<p className="titulo">{result.title}</p>
                	</div>
                  <div className="ciudad">
                    <p>{result.seller_address}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Result;