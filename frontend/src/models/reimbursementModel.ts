import User from "./userModel";

interface Reimbursement {
    amount: number,
    description: string,
    reimbId: number,
    status: string,
    user: User
}

export default Reimbursement;