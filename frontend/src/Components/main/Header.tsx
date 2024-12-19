import "./Header.css"
import LoginBtn from "./LoginBtn"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();
    return (
        <header>
            <Container>
                <Row>
                    <Col onClick={() => navigate("/")} style={{cursor: "pointer"}}>
                        <h2>McCann Reimbursement Service</h2>
                    </Col>
                    <Col md="auto">
                        <LoginBtn />
                    </Col>
                </Row>
            </Container>
        </header>
    )
}