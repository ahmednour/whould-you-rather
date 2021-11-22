import React, { Component } from 'react'
import { Container, Col, Card , Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/shared'

class Poll extends Component {
    state = {
        answer: ''
    }
    handleVote = (vote) => {
        this.setState(() => ({
            answer: vote
        }))
    }

    handleSu = (e, answer) => {
        e.preventDefault()
        const { dispatch, id, authedUser } = this.props

        if (answer) {
            dispatch(handleAddQuestionAnswer({ authedUser, qid: id, answer }))
        } else {
            alert(" Please , Select an option")
        }
    }

    render() {
        const { question, users, id, authedUser } = this.props

        if (!question) {
            return <Redirect to='/notFound' />
        }

        const author = question ? users[question.author] : null
        const usersAnswer = question ? users[authedUser].answers[id] : null
        const questionAnswered = question ? question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser) : false
        const questionOneVotes = question.optionOne.votes.length
        const questionTwoVotes = question.optionTwo.votes.length
        const questionTotalVotes = questionOneVotes + questionTwoVotes
        const questionOnePercent = Math.floor(questionOneVotes / questionTotalVotes * 100)
        const questionTwoPercent = Math.floor(questionTwoVotes / questionTotalVotes * 100)

        return (
            <div className="boxConatiner">
                <Container>
                   <Row className="justify-content-md-center mt-5">
                   <Col xs={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{author.name} asks </Card.Title>
                                <Card.Text>
                                    <div className="autherinfo">
                                        <Card.Img alt={author.avatarURL} src={author.avatarURL} ></Card.Img>
                                    </div>
                                    {questionAnswered ? (
                                        <div className="pollResalut">
                                            <h3>Poll Results:</h3>
                                            <div className="polldiv">
                                                <h4>A: {question.optionOne.text}</h4>
                                                <p>
                                                    {questionOneVotes} out of {questionTotalVotes} votes ({questionOnePercent}% ) {usersAnswer === 'optionOne' ? <span>Your Vote</span> : ''}
                                                </p>
                                            </div>
                                            <div className="polldiv">
                                                <h4>B: {question.optionTwo.text}</h4>
                                                <p>
                                                    {questionTwoVotes} out of {questionTotalVotes} votes ({questionTwoPercent}% ) {usersAnswer === 'optionTwo' ? <span>Your Vote</span>  : ''}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="boxvotes">
                                            <h2> Whould You Rather </h2>
                                            <div className="votes">
                                                <input type="radio" onClick={(e) => this.handleSu(e, "optionOne")} />
                                                <label>A: {question.optionOne.text} </label>
                                            </div>                                          
                                            <div className="votes">
                                                <input type="radio" onClick={(e) => this.handleSu(e, "optionTwo")} />
                                                <label>B: {question.optionTwo.text} </label>
                                            </div>
                                        </div>
                                    )
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                   </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
    const { id } = match.params
    const question = questions[id]

    return {
        question,
        users,
        id,
        authedUser,
    }
}



export default connect(mapStateToProps)(Poll);
