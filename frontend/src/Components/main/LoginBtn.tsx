// fontawesome (https://docs.fontawesome.com/v5/web/use-with/react)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
// React-Bootstrap (https://react-bootstrap.netlify.app/docs/getting-started/introduction)
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';


export default function () {
    const {logout, user} = useAuth();
    const navigate = useNavigate();

    const isLoggedInDropdown = (
        <Dropdown drop="down-centered">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} /> Hello, {user?.username}!
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/create_reimbursement")}>Create Reimbursement Ticket</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/reimbursements")}>View Reimbursements</Dropdown.Item>
                {user?.role === "manager" &&
                    <Dropdown.Item onClick={() => navigate("/users")}>View Users</Dropdown.Item>
                }
                <Dropdown.Item onClick={() => {logout(); navigate("/")}}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    const isNotLoggedInBtn = (
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faUser} /> Login
        </button>
    )

    return user? isLoggedInDropdown : isNotLoggedInBtn;
}