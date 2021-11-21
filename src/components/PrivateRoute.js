import React from "react"
import { BrowserRouter as Route, Redirect, withRouter }  from 'react-router-dom'
import { connect } from "react-redux"

function PrivatRoute ({ component : Component , ...rest }){
    return(
        <Route
            {...rest}
            render={(props)=>{
                return rest.authedUser ? (
                    <Component {...props}/>                
                ):(
                    <Redirect  to={{pathname : "/" , state:{from: props.location},}}/>
                );
            }}
        />
    );
}

function mapStateToProps(authedUser){
    return{
        authedUser,

    }
}


export default withRouter(connect(mapStateToProps)(PrivatRoute))

