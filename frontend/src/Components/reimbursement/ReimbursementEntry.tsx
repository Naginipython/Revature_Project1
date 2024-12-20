import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Reimbursement from "../../models/reimbursementModel";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function({reimbursement, isManager}: {reimbursement: Reimbursement, isManager: boolean}) {
    const [updateDescToggle, setUpdateDescToggle] = useState<boolean>(false);
    const [updateStatusToggle, setUpdateStatusToggle] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>(reimbursement.description);
    const [status, setStatus] = useState<string>(reimbursement.status);

    const toggleDescUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateDescToggle(e.target.checked);
    };
    const toggleStatusUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateStatusToggle(e.target.checked);
    };

    const changeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
    }

    const submitBtn = () => {
        if (updateDescToggle) {
            submitDescUpdate();
        } else if (updateStatusToggle) {
            submitStatusUpdate();
        }
    }

    const submitDescUpdate = () => {
        axios.patch(`http://localhost:8080/reimbursement/update_desc`, 
            {description: desc, reimbId: reimbursement.reimbId}, 
            {withCredentials: true}
        ).then(res => {
            console.log(res.data);
            setUpdateDescToggle(false);
            reimbursement.description = res.data.description;
        }).catch(err => {
            console.log(err);
            toast.error("Failed to update description");
        });
        console.log(desc);
    }
    const submitStatusUpdate = () => {
        axios.patch(`http://localhost:8080/reimbursement/update_status`, 
            {status: status, reimbId: reimbursement.reimbId}, 
            {withCredentials: true}
        ).then(res => {
            console.log(res.data);
            setUpdateStatusToggle(false);
            reimbursement.status = res.data.status;
        }).catch(err => {
            console.log(err);
            toast.error("Failed to update status");
        });
        console.log(status);
    }

    return (
        <tr key={reimbursement.reimbId}>
            {isManager
                && <td>{reimbursement.user.firstName} {reimbursement.user.lastName}</td>}
            <td>${reimbursement.amount.toFixed(2)}</td>
            <td>
                {updateDescToggle? 
                    <Form.Control 
                        type="text" 
                        id={`updateDesc-${reimbursement.reimbId}`} 
                        defaultValue={reimbursement.description} 
                        onChange={changeDesc}
                    />
                    : reimbursement.description
                }
            </td>
            <td>
                {updateStatusToggle?
                    <DropdownButton title={status} id="statusUpdateDropdown" variant="primary" onSelect={(eventKey) => setStatus(eventKey as string)}>
                        <Dropdown.Item eventKey="PENDING">PENDING</Dropdown.Item>
                        <Dropdown.Item eventKey="APPROVED">APPROVED</Dropdown.Item>
                        <Dropdown.Item eventKey="DENIED">DENIED</Dropdown.Item>
                    </DropdownButton>
                    : reimbursement.status
                }
            </td>
            <td className={isManager? "d-flex gap-2 align-items-center" : ""}>
                {reimbursement.status === "PENDING" && !isManager
                    && <Form.Check 
                        type="checkbox" 
                        id={`toggleDescUpdate-${reimbursement.reimbId}`} 
                        label="Update Description?" 
                        onChange={toggleDescUpdate}
                        style={{ display: "inline-block", marginRight: "10px" }}
                    />
                }
                {isManager 
                    && <Form.Check 
                        type="checkbox" 
                        id={`toggleStatUpdate-${reimbursement.reimbId}`} 
                        label="Update Status?" 
                        onChange={toggleStatusUpdate}
                        style={{ display: "inline-block", marginRight: "10px" }}
                    />
                }
                <Button onClick={submitBtn} className={updateDescToggle || updateStatusToggle? "" : "d-none"}>Submit</Button>
                
            </td>
        </tr>
    );
}