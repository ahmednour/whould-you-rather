import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import {  Redirect, withRouter }  from 'react-router-dom'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Card , FloatingLabel } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class Login extends Component {
    state ={
        redirectToReferrer:false,
        id:''
    }
    setUser = (e) =>{
        this.setState(() => ({
            id: e.target.value
        }))
    }

    handleLogin = (e) =>{
        e.preventDefault()
        const {dispatch} = this.props
        if(this.state.id !==''){
            dispatch(setAuthedUser(this.state.id))
            this.setState({
                redirectToReferrer:true,
            });
            //this.props.history.push("/home");
        }else{
            alert("Pleas , Select User")
        }
    }
    render() {
        const {users  , location} = this.props
        const { redirectToReferrer } = this.state

         const {from } = location.state || {
            from: {pathname : "/home"}
         }
         if(redirectToReferrer){
            return <Redirect  to={from}/>
         }
         return (
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col xs={6}>
                        <Card className="text-center card-custom">
                            <Card.Header>Wlecome to Whould You Rather App </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="users">
                                        <FloatingLabel controlId="floatingSelectGrid" label="Select User To Sign in">
                                            <Form.Select   onChange={this.setUser }>
                                                <option vlaue={''}>-- Select User --</option>
                                               {users.map((name) =>(
                                                   <option key={name} value={name}>
                                                       {name}
                                                   </option>
                                               ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Form>
                                <Button variant="primary" onClick={this.handleLogin}> Log in</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps (state)  {
    return{
        users : Object.keys(state.users)
    }
}


export default  connect(mapStateToProps)(withRouter(Login))
