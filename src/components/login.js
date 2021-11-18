import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setAuthedUser } from '../actions/authedUser'
import { withRouter , Redirect } from 'react-router-dom'

class Login extends Component {
    render() {
        return (
            <div>
                <h1> login page </h1>
            </div>
        )
    }
}

const mapStateToProps = (users) => ({
    users,
})


export default connect(mapStateToProps)(withRouter(Login))
