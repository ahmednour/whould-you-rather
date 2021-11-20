import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import {  Redirect , withRouter } from 'react-router-dom'
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
        if(this.state.id !==''){
            this.props.dispatch(setAuthedUser(this.state.id))
            this.setState({
                redirectToReferrer:true,
            })
        }else{
            alert("Pleas , Select User")
        }
    }
    render() {
        const {users } = this.props
        const { redirectToReferrer } = this.state

         const {from } = this.props.location.state || {
            from: {pathname : "/home"}
         }
         if(redirectToReferrer){
            return <Redirect  to={from}/>
         }
         return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <Card className="text-center">
                            <Card.Header>Wlecome to Whould You Rather App </Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3" controlId="users">
                                        <FloatingLabel controlId="floatingSelectGrid" label="Select User To Sign in">
                                            <Form.Select   onChange={this.setUser }>
                                                <option vlaue={''}>-- Select User --</option>
                                               {Object.keys(users).map((uid) =>(
                                                   <option key={uid} value={uid}>
                                                       {uid}
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

function mapStateToProps (users)  {
    return{
        users,
    }
}


export default withRouter( connect(mapStateToProps)(Login))
