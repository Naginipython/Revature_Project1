import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoginForm from './LoginForm';
import NewAccountForm from './newAccountForm';

export default function ({isLoggingIn}: {isLoggingIn: boolean}) {
    const title = isLoggingIn ? "Login" : "Create Account";
    return (
        <Container className="col-md-5 mx-auto">
            <Row>
                <Col>
                    <Button href="/" variant='secondary'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </Col>
                <Col>
                    <h3>{title}</h3>
                </Col>
            </Row>
            {isLoggingIn ? <LoginForm /> : <NewAccountForm />}
        </Container>
    )
}