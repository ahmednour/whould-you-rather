import React, { Component } from 'react'
import { Container, Image, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/shared'

export class Poll extends Component {
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
            return <Redirect to='/Eroro' />
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
                    <Col xs={12}>
                        <h2> {author.name} asks </h2>
                        <div className="autherinfo">
                            <Image alt={author.avatarURL} src={author.avatarURL} ></Image>
                        </div>

                        {questionAnswered ? (
                            <div className="pollResalut">
                                <h3>Poll Results:</h3>
                                <div className="polldiv">
                                    <h4>A: {question.optionOne.text}</h4>
                                    <p>
                                        {questionOneVotes} out of {questionTotalVotes} votes ({questionOnePercent}% ) {usersAnswer === 'optionOne' ? '-- Your answer' : ''}
                                    </p>
                                </div>
                                <div className="polldiv">
                                    <h4>A: {question.optionTwo.text}</h4>
                                    <p>
                                        {questionTwoVotes} out of {questionTotalVotes} votes ({questionTwoPercent}% ) {usersAnswer === 'optionTwo' ? '-- Your answer' : ''}
                                    </p>
                                </div>
                            </div>
                        ) : (
                           
                                <div className="boxvotes">
                                    <h2> Whould You Rather </h2>
                                    <div className="votes">
                                        <input type="radio" onClick={(e) => this.handleSu(e, "optionOne")} />
                                    </div>
                                    <label>A: {question.optionOne.text} </label>                               
                                    
                                    <div className="votes">
                                        <input type="radio" onClick={(e) => this.handleSu(e, "optionTwo")} />
                                    </div>
                                    <label>B: {question.optionTwo.text} </label>
                                </div>                           
                        )
                        }
                    </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser , users , questions} , {match}) {
    const {id} =match.params
    const question = questions[id]

    return{
        question,
        users,
        id,
        authedUser,
    }
}



export default connect(mapStateToProps)(Poll);
