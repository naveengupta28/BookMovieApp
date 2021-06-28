import React  from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../common/header/Header'
import Home from './home/Home'

export default function Controller(params) {
    return (<div>
    
           <Router>
               <Header/>
               <Switch>
                <Route exact path="/" component={Home}/>

               </Switch>
           </Router>

    </div>);
}