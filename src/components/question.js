import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class PollCard extends Component {
    render() {
        const { question, user, questionId } = this.props
        return (


            <Col xs={12}>
                <Card className="text-center card-custom">
                    <Card.Img variant="top" src={user.avatarURL} />
                    <Card.Body>
                        <Card.Title> {user.name} asks </Card.Title>
                        <Card.Text>
                            <div> Whould You Rather : </div>
                            <div> A: {question.optionOne.text} </div>
                            <div> B: {question.optionTwo.text} </div>
                        </Card.Text>
                        <Link to={`/questions/${questionId}`}>
                            <Button variant="primary">View POll Vote</Button></Link>
                    </Card.Body>
                </Card>
            </Col>


        )
    }
}

function mapStateToProps({ questions, users }, { id }) {
    const question = questions[id]
    const questionId = question.id
    const user = users[question.author]
    return {
        question,
        questionId,
        user,
    }
}



export default connect(mapStateToProps)(PollCard)
