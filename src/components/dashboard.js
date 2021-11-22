import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Nav, Row, Card } from 'react-bootstrap'
import PollCard from './question'

// un answered question function
function getUnansweredQuestions(questions, authedUser) {
    return (
        questions.filter((q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
    )
}
// answered question function 
function getAnsweredQuestions(questions, authedUser) {
    return (
        questions.filter((q) => !q.optionOne.votes.includes(authedUser) || !q.optionTwo.votes.includes(authedUser))
    )
}
class dashboard extends Component {
    state = {
        switchQuestion: 'Unanswered',
    }
    handleswitchQuestion = (type) => {
        this.setState(() => ({
            switchQuestion: type
        }))

    }

    render() {
        const { switchQuestion } = this.state
        const { authedUser, questions } = this.props

        const answered = getUnansweredQuestions(Object.values(questions), authedUser)
        const unanswered = getAnsweredQuestions(Object.values(questions), authedUser)
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center mt-5">
                        <Col xs={12} md={6}>
                            <Card>
                                <Card.Header>
                                    <Nav className="justify-content-center" variant="tabs" defaultActiveKey="link-1">
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1" value={'Unanswered'} onClick={() => this.handleswitchQuestion("Unanswered")}>Unanswered </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2" value={'Answered'} onClick={() => this.handleswitchQuestion("Answered")}>Answered</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    {switchQuestion === 'Unanswered' &&
                                        <div className="CardList">
                                            {unanswered.sort((a, b) => b.timestamp - a.timestamp).map((q) =>
                                                <PollCard id={q.id} key={q.id} />
                                            )}
                                        </div>
                                    }
                                    {switchQuestion === 'Answered' &&
                                        <div className="CardList">
                                            {answered.sort((a, b) => b.timestamp - a.timestamp).map((q) =>
                                                <PollCard id={q.id} key={q.id} />
                                            )}
                                        </div>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authedUser, questions } = state
    return {
        authedUser,
        questions,
    }
}


export default connect(mapStateToProps)(dashboard)
