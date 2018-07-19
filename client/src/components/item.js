import React, { Component } from 'react';
import '../css/item.css';
import Search from '../components/search';
import {Breadcrumb} from '../components/breadcrumb';
import { Route } from 'react-router'

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      category: []
    };
  }
  async componentDidMount() {
    const prodID = this.props.match.params.id;
    const prodIDfinal = prodID.replace(/[^\x00-\x7F]/g, "");
    const jsonProd = await fetch(`http://localhost:3001/api/producto/${prodIDfinal}`);
    const json = await jsonProd.json();
    this.setState({ item: json[0].itemInfo, category: json[0].category });
    console.log(this.state.category)
  }

  render() {
    return (
      <div>
        <Search/>
        <Breadcrumb filters={this.state.category}/>
        
        <div className="container">
          <div className="producto">
            <div className="prodRight">
              {this.state.item.picture && ( <img src={this.state.item.picture} /> )}
              <div className="descripcion">
                <p className="titleDescr">Descripción del producto</p>
                <p className="info">{this.state.item.description}</p>
              </div>
            </div>
            <div className="prodLeft">
              <span className="estado">
                {this.state.item.condition === "new" && (
                  <span className="vendidos">
                    Nuevo - {this.state.item.sold_quantity} vendidos
                  </span> )}
                {this.state.item.condition === "used" && (
                  <span className="vendidos">
                    Usado - {this.state.item.sold_quantity} vendidos
                  </span> )}
              </span>
              <p className="nombreProd">{this.state.item.title}</p>
              <p className="precioProd">${this.state.item.price}</p>
              <button className="comprar">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;