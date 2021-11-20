import React, { Component } from 'react'
import { Container, Image ,Col } from 'react-bootstrap'
import { connect } from 'react-redux'

 class leaderBoard extends Component {
    render() {
        const { users, leaderboard } = this.props
        return (
            <Container>
                <Col>
                    <div className="leaderBox">
                        <h2> leaderboard</h2>
                        {leaderboard.sort((a, b) => b.totalPoints).map(user => (
                            <div key={user.id}>
                                <div className="proifleBox">
                                    <h2 className="username">
                                        {`${users[user.id].name}`}
                                    </h2>
                                    <Image src={users[user.id].avatarURL} ></Image>
                                    <div className="questionBox">
                                        <p> Questions answered : {Object.keys(users[user.is].answer).length} </p>
                                        <p> Questions Asked : {users[user.is].questions.length} </p>
                                        <p> {user.totalPoints} Points </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Container>
        )
    }
}

function mapStateToProps ({users}) {
    const leaderboard = Object.keys(users).map(id => ({
        id:id,
        totalPoints:
            Object.keys(users[id].answers).length + users[id].questions.length
    }))
    return {
        leaderboard,
        users
    }
}


export default connect(mapStateToProps)(leaderBoard)
