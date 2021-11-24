import React, { Component } from 'react'
import { Card, Container, Col, Row, InputGroup , Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'


class AddQuestion extends Component {
    state = {
        option1: '',
        option2: '',
        toHome: false
    }
    handleChange = (e) => {
        const text = e.target.value
        const stateName = e.target.name
        this.setState(() => ({
            [stateName]: text
        }))
    }

    handleSub = (e) => {
        e.preventDefault()

        const { option1, option2 } = this.state
        const { dispatch } = this.props

        if (option1.length > 0 && option2.length > 0) {
            dispatch(handleAddQuestion( option1, option2  )).then(() => this.setState(() => ({
                toHome: true,
            }))
            )
        } else {
            alert("you must fill in both option ")
        }
    }
    render() {
        const { option1, option2, toHome } = this.state

        if (toHome) {
            return <Redirect to="/home" />
        }
        return (

            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col xs={6}>
                        <Card>
                            <Card.Img variant="top" src="../../images/question.png" className="logoQ" />
                            <Card.Body className="text-center">
                                <Card.Title>Create New Question :</Card.Title>
                                <Card.Text>
                                    <form onSubmit={this.handleSub}>
                                        <h3> Would You Rather</h3>
                                        <InputGroup className="mb-3">
                                            <input name="option1" className="form-control" placeholder="option One" onChange={this.handleChange} defaultValue={option1} />
                                            <InputGroup.Text id="inputGroup-sizing-default">OR</InputGroup.Text>
                                            <input name="option2" className="form-control" placeholder="option Two" onChange={this.handleChange} defaultValue={option2} />
                                        </InputGroup>                                       
                                        <Button className="Subutton" type="submit" > Submit Question</Button>
                                    </form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ authedUser}) {
    return {
        authedUser,        
    }
}



export default connect(mapStateToProps)(AddQuestion)
