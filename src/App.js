import React, { Component } from 'react';
// import logo from './logo.svg';
import componentsStyle from "../src/assets/jss/material-kit-react/views/components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Schedule from '../src/component/Schedule/Schedule'
import Header from '../src/component/Header/Header'
import Member from '../src/component/Members/Member'
import Left from './component/Header/HeaderLinks'
import Logo from '../src/assets/img/Logo.png'
import './App.css';
const LogoComp = <img alt="" src={Logo} width={80} />




class App extends Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <Router >
        <div className="App">
          <Header
            brand={LogoComp}
            leftLinks={<Left />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
            {...rest}
          />
          <div style={{ width: "100%", height: 80, background: "#000" }}></div>


          <Route path="/Schedule/" component={Schedule} />
          <Route path="/Member/" component={Member} />
        </div>


      </Router>
    );
  }
}

export default withStyles(componentsStyle)(App);
