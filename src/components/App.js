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
            : <>
              <Route path="/" exact element={Login}/>
              <PrivatRoute path='/home' exact Component={dashboard} />
              <PrivatRoute path='/add' exact Component={AddQuestion} />
              <PrivatRoute path='/leaderBoard' exact Component={leaderBoard} />
              <PrivatRoute path='/questions/:id' exact Component={Poll} />
              <Route path='/notfound' exact Component={notFound} />
            </>
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

