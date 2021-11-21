import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

 class PollCard extends Component {
    render() {
        const {question , user , questionId} = this.props
        return (
            <Card>
                <Card.Img variant="top" src={user.avatarURL} />
                <Card.Body>
                    <Card.Title> {user.name} asks </Card.Title>
                    <Card.Text>
                        <h5> Whould You Rather : </h5>
                        <p> A: {question.optionOne.text} </p>
                        <p> A: {question.optionTwo.text} </p>
                    </Card.Text>
                    <Link to={`/questions/${questionId}`}>
                    <Button variant="primary">View POll Vote</Button></Link>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ questions ,users } , {id}) {
    const question = questions[id]
    const questionId = question.id
    const user = users[question.author]
    return{
        question,
        questionId,
        user,
    }
}



export default connect(mapStateToProps)(PollCard)
