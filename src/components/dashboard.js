import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container , Col , Nav } from 'react-bootstrap'
import PollCard from './question'

// un answered question function
function getUnansweredQuestions (questions , authedUser){
    return(
        questions.filter((q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
    )
}
// answered question function 
function getAnsweredQuestions (questions , authedUser){
    return(
        questions.filter((q) => !q.optionOne.votes.includes(authedUser) || !q.optionTwo.votes.includes(authedUser) )
    )
}
class dashboard extends Component {
state = {
    switchQuestion : 'UnAnswered',
}
handleswitchQuestion = e => {
    const switchQuestion = e.target.value
        this.setState(() =>({
            switchQuestion
        }))
    
}

    render() {
        const {switchQuestion} = this.state
        const {authedUser , questions} = this.props 

        const answered = getUnansweredQuestions(Object.values(questions), authedUser)
        const unanswered = getAnsweredQuestions(Object.values(questions).authedUser)
        return (
            <div>
                <Container>
                    <Col xs={6} md={6}>
                        <Nav className="justify-content-center" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" value={'Unanswered'} onClick={this.handleswitchQuestion}>Unanswered </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" value={'Answered'} onClick={this.handleswitchQuestion}>Answered</Nav.Link>
                            </Nav.Item>                           
                        </Nav>
                        {switchQuestion === 'Unanswered' &&
                            <div className="CardList">
                                { unanswered.sort((a,b) => b.timestamp - a.timestamp).map((q) =>
                                    <PollCard id={q.id} key={q.id} />
                                )}     
                            </div>
                        }
                        {switchQuestion === 'Answered' &&
                            <div className="CardList">
                                { answered.sort((a,b) => b.timestamp - a.timestamp).map((q) =>
                                    <PollCard id={q.id} key={q.id} />
                                )}     
                            </div>
                        }
                    </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps (state) {
  const {authedUser , questions} =state
  return{
      authedUser,
      questions,
  }
}


export default connect(mapStateToProps)(dashboard)
