import { Button, Container, Table } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import User from "../../models/userModel";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function () {
    const { user } = useAuth();
    const [employees, setEmployees] = useState<User[]>([]);

    // TODO: promote select users

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = () => {
        axios.get(`http://localhost:8080/user`, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            setEmployees(res.data);
        })
        .catch(err => {
            console.log(err);
            toast.error("Failed to get users");
        })
    };

    const deleteUser = (userId: number) => {
        axios.delete(`http://localhost:8080/user/${userId}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                getEmployees();
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to delte user");
            })
    };

    const promoteUser = (userId: number) => {
        axios.patch(`http://localhost:8080/user/${userId}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                getEmployees();
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to promote user");
            })
    };

    return (
        <Container>
            <h2>Users</h2>

            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th style={{ width: "150px" }}>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => {
                        return (
                            <tr>
                                <td>{employee.firstName} {employee.lastName}</td>
                                <td>{employee.username}</td>
                                <td>{employee.role}</td>
                                <td className="d-flex gap-2">
                                    {employee.role !== "manager" &&
                                        <Button variant="success" size="sm" onClick={() => promoteUser(employee.userId)}>Promote</Button>
                                    }
                                    {user?.userId !== employee.userId &&
                                        <Button variant="danger" size="sm" onClick={() => deleteUser(employee.userId)}>Delete</Button>
                                    }
                                    {user?.userId === employee.userId &&
                                        "N/A"
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}