import React  from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../common/header/Header'
import Details from "./details/Details";
import Home from './home/Home'

export default function Controller(params) {
    return (<div>
    
           <Router>
               <Header/>
               <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/details/:id" component={Details}/>


               </Switch>
           </Router>

    </div>);
}