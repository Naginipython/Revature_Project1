import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { toast } from 'react-toastify';


export default function () {
    const {user} = useAuth();
    const [amount, setAmount] = useState<number>(0);
    const [desc, setDesc] = useState<string>("");

    const setField = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case "formAmount":
                let amount = parseInt(e.target.value);
                if (amount < 0)
                    amount = 0;
                setAmount(amount);
                break;
            case "formDesc":
                setDesc(e.target.value);
                break;
            default:
                break;
        }
    };

    const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user?.userId);
        axios.post("http://localhost:8080/reimbursement", {
            amount: amount,
            description: desc,
            userId: user?.userId,
        }, {withCredentials: true}).then(res => {
            console.log(res.data);
            toast.success("Reimbursement created successfully", { autoClose: 2000 });
        }).catch(err => {
            console.log(err);
            toast.error("Error creating reimbursement");
        });
    }

    return (
        <Container>
            <h4>Create a Reimbursement</h4>
            <Form onSubmit={submit}>
                <Form.Group controlId="formAmount" className="w-25" onChange={setField}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter Reimbursement Amount" />
                </Form.Group>
                <Form.Group controlId="formDesc" className="mt-3" onChange={setField}>
                    <Form.Label>What is this reimbursement for? Please describe below</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Description" />
                </Form.Group>
                    <Button type="submit" variant="primary mt-3">Submit</Button>
            </Form>
        </Container>
    )
}