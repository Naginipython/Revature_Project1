import { Container, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";


export default function () {
    const {user} = useAuth();
    const [showStatus, setShowStatus] = useState<string>("ALL");
    const [reimbursements, setReimbursements] = useState<any[]>([]);
    
    // NEED TO KNOW: HOW TO TELL IF USER IS MANAGER!
    // TODO: Manager sees all reimbursements
    // TODO: view reimbursements
    // TODO: see certain reimbursements (PENDING, APPROVED, DENIED)
    // TODO: update desc
    // TODO: Manager change status
    useEffect(() => {
        // TODO: will change
        axios.get(`http://localhost:8080/tickets?username=${user?.username}&password=${user?.password}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <Container>
            <h2>Reimbursements</h2>
            <DropdownButton title={"Show: " + showStatus} id="statusDropdown" variant="secondary" onSelect={(eventKey) => setShowStatus(eventKey as string)}>
                <Dropdown.Item eventKey="ALL">ALL</Dropdown.Item>
                <Dropdown.Item eventKey="PENDING">PENDING</Dropdown.Item>
                <Dropdown.Item eventKey="APPROVED">APPROVED</Dropdown.Item>
                <Dropdown.Item eventKey="DENIED">DENIED</Dropdown.Item>
            </DropdownButton>
            <Table striped>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </Container>
    )
}