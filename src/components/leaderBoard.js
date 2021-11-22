import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { connect } from 'react-redux'

class leaderBoard extends Component {
    render() {
        const { users, leaderboard } = this.props
        return (
            <Container>
            <h2 className="leaderHeader">leaderboard</h2>
                <Row className="justify-content-md-center mt-5">
                    {leaderboard.sort((a, b) => b.totalPoints).map(user => (
                        <Col xs={3}>
                            <Card className="leaderBox">
                                <Card.Img src={users[user.id].avatarURL} variant="top" ></Card.Img>       
                                <Card.Body>                                    
                                    <Card.Text>
                                        <div key={user.id}>
                                            <div className="proifleBox">                                              
                                                <h2 className="username">
                                                    {`${users[user.id].name}`}
                                                </h2>
                                                <div className="questionBox">
                                                    <p> Questions answered: {Object.keys(users[user.id].answers).length} </p>
                                                    <p> Questions Asked: {users[user.id].questions.length} </p>
                                                    <span> {user.totalPoints} Points </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    const leaderboard = Object.keys(users).map(id => ({
        id: id,
        totalPoints:
            Object.keys(users[id].answers).length + users[id].questions.length
    }))
    return {
        leaderboard,
        users
    }
}


export default connect(mapStateToProps)(leaderBoard)
