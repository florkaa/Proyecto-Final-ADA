import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './components/search';
import Result from './components/result';
import Item from './components/item';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Search} />
            <Route exact path="/search/:id" component={Result} />
            <Route path="/items/:id" component={Item} />
          </div>
      </Router>
    );
  }
}

export default App;
