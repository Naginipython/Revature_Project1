import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function () {
    const {createUser, login} = useAuth();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const setField = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case "formFirstName":
                setFirstName(e.target.value);
                break;
            case "formLastName":
                setLastName(e.target.value);
                break;
            case "formUsername":
                setUsername(e.target.value);
                break;
            case "formPassword":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser(firstName, lastName, username, password)
            .then((success) => {
                if (success) {
                    login(username, password).then(() =>{
                        navigate("/");
                    })
                }
            });
        
    };

    return (
        <Form onSubmit={handleForm}>
            <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="firstName" placeholder="Enter your First Name" onChange={setField} />
            </Form.Group>
            <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lastName" placeholder="Enter your Last Name" onChange={setField} />
            </Form.Group>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter a Username" onChange={setField} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={setField} />
            </Form.Group><br />
            <Container className="col-md-5 mx-auto">
                <Row>
                    <Col md="auto">
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" type="reset" onClick={() => navigate("/login")}>
                            Back to Login
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}