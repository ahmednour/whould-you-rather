import React, { Component , Fragment} from 'react';
import { connect } from 'react-redux'
import {handleInitialData} from "../actions/shared"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  LoadingBar  from 'react-redux-loading-bar';
import Login from './login';
import leaderBoard from './leaderBoard';
import PrivatRoute from './PrivateRoute';
import dashboard from './dashboard'
import AddQuestion from './AddQuestion'
import  NavBar  from './nav';
import Poll from './Poll'
import notFound from './notFound';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    return (
      
      <Router>
         <Fragment>
         <LoadingBar/>
          <NavBar/>
          {this.props.loading === true
            ? null
            : <div>
              <Route path="/" exact component={Login}/>
              <PrivatRoute path='/home' exact component={dashboard} />
              <PrivatRoute path='/add' exact component={AddQuestion} />
              <PrivatRoute path='/leaderBoard' exact component={leaderBoard} />
              <PrivatRoute path='/questions/:id' exact component={Poll} />
              <Route path='/notfound' exact component={notFound} />
            </div>
          }
         </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({LoadingBar}) {
  
  return {
      loading: LoadingBar > 0
      
  }
}


export default connect(mapStateToProps)(App)

