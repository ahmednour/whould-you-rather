import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
 class NavBar extends Component {
    state = {
        tologin: false
    }
    Logout = (e) => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
        this.setState(() => ({
            tologin: true,
        }));
    }
    render() {
        if (this.props.tologin) {
            return <Redirect to={'/'} />;
        }
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand >Would You Rather</Navbar.Brand>
                {this.props.authedUser ? (
                    <>
                        <div className="me-auto">
                            <NavLink to="/home">Home</NavLink>
                            <NavLink to='/add'>New Question</NavLink>
                            <NavLink to='/leaderboard'>Leaderboard</NavLink>
                        </div>
                        <div>
                            <NavLink to='/' exact>
                                Hello , {this.props.user ? this.props.user.name : null}
                                {/* <image src={this.props.user.avatarURL} rounded /> */}
                                <Button variant="outline-primary" onClick={this.Logout}>Log out</Button>
                            </NavLink>

                        </div>
                    </>
                ) : (
                    <>
                        <div className="me-auto">
                            <NavLink to="/home">Home</NavLink>
                            <NavLink to='/add'>New Question</NavLink>
                            <NavLink to='/leaderboard'>Leaderboard</NavLink>
                        </div>
                        <div>
                            <NavLink to='/' exact>
                                Login 
                                {/* <Image src={this.props.user.avatarURL} rounded /> */}
                                <Button variant="outline-primary" >Log in</Button>
                            </NavLink>
                        </div>
                    </>
                )}


            </Navbar>
        )
    }
}

function mapStateToProps (state)  {
    const { users , authedUser} = state
    const user = users[authedUser]
    return{
        user,
        authedUser
    }
}


export default connect(mapStateToProps)(NavBar)
