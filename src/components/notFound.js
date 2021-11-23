import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
class notFound extends Component {
    render() {
        return (
            <Container>
                <Row >
                    <Col xs={12}>
                        <div className="Error text-center d-flex justify-content-center align-items-center">
                            <h2> 404 Not Found </h2>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default notFound
