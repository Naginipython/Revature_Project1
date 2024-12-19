import { Container, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Reimbursement from "../../models/reimbursementModel";

export default function () {
    const {user} = useAuth();
    const [showStatus, setShowStatus] = useState<string>("ALL");
    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    
    // NEED TO KNOW: HOW TO TELL IF USER IS MANAGER!
    // TODO: update desc
    // TODO: Manager change status
    useEffect(() => {
        axios.get(`http://localhost:8080/reimbursement`, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            setReimbursements(res.data);
        })
        .catch(err => {
            console.log(err);
            toast.error("Failed to get reimbursements");
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
                        {user?.role == "manager" 
                            && <th>Employee</th>}
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.filter(reimbursement => showStatus === "ALL" || reimbursement.status === showStatus).map(reimbursement => {
                        return (
                            <tr key={reimbursement.reimbId}>
                                {user?.role == "manager" 
                                    && <td>{reimbursement.user.firstName} {reimbursement.user.lastName}</td>}
                                <td>${reimbursement.amount}</td>
                                <td>{reimbursement.description}</td>
                                <td>{reimbursement.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    )
}