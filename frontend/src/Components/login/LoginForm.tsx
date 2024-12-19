import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [loginCred, setLoginCred] = useState({username: "", password: ""});

    const setField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e?.target.name;
        const value = e?.target.value;
        setLoginCred({
            ...loginCred,
            [name]: value
        });
    };

    const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(loginCred.username, loginCred.password)
            .then((success) => {
                toast.success("Logged in successfully", { autoClose: 2000 });
                if (success) {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error logging in");
            });
    }
    
    return (
        <Form onSubmit={handleForm}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" name="username" placeholder="Enter a Username" onChange={setField} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={setField} />
            </Form.Group><br />
            <Container className="col-md-5 mx-auto">
                <Row>
                    <Col md="auto">
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" type="reset" onClick={() => navigate("/new_account")}>
                            Create new Account
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}