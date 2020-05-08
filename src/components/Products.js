import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchProducts = async() => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try{
    const res = await axios.get(`${config.api.invokeUrl}/productos`);
    this.setState({products: res.data});
    }catch(err){
      console.log(`Ha habido un error: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Productos en inventario</h1>
            <p className="subtitle is-5">Estos son los productos con los que dispone su tienda:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0
                      ? this.state.products.map(product => <Product name={product.cantidad} id={product.id} key={product.id} />)
                      : <div className="tile notification is-warning">No hay productos actualmente</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
