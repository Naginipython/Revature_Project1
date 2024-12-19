import { useAuth } from "../../AuthContext";


export default function () {
    const {user} = useAuth();
    console.log(user);
    // TODO: view all users
    // TODO: promote select users
    // TODO: delete select users
    return (
        <div>
            <h1>Users</h1>
        </div>
    )
}