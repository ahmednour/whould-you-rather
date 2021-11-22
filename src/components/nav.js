import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Button, Container, Nav ,Image } from 'react-bootstrap'
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
                <Container fluid>
                    <Navbar.Brand >Would You Rather</Navbar.Brand>
                    {this.props.authedUser ? (
                        <>
                            <Nav className="me-auto">
                                <NavLink to="/home" className="nav-link">Home</NavLink>
                                <NavLink to='/add' className="nav-link">New Question</NavLink>
                                <NavLink to='/leaderboard' className="nav-link">Leaderboard</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to='/' exact className="nav-link">
                                   <Image src={this.props.user.avatarURL} rounded className="avatar" /> 
                                    Hello , {this.props.user ? this.props.user.name : null}                                    
                                    <Button variant="primary" onClick={this.Logout} className="logout">Log out</Button>
                                </NavLink>

                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="me-auto" >
                                <NavLink to="/home" className="nav-link">Home</NavLink>
                                <NavLink to='/add' className="nav-link">New Question</NavLink>
                                <NavLink to='/leaderboard' className="nav-link">Leaderboard</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to='/' exact className="nav-link">
                                    {/* <Image src={this.props.user.avatarURL} rounded /> */}
                                    <Button variant="primary" >Log in</Button>
                                </NavLink>
                            </Nav>
                        </>
                    )}

                </Container>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    const { users, authedUser } = state
    const user = users[authedUser]
    return {
        user,
        authedUser
    }
}


export default connect(mapStateToProps)(NavBar)
