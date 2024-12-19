import CreateReimbursement from './Components/create_reimbursement/CreateReimbursement'
import Login from './Components/login/Login'
import Main from './Components/main/Main'
import Reimbursement from './Components/reimbursement/Reimbursement'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './Components/users/Users'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route index element={<></>} />
            <Route path="/create_reimbursement" element={<CreateReimbursement />} />
            <Route path="/reimbursements" element={<Reimbursement />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login isLoggingIn={true} />} />
          <Route path="/new_account" element={<Login isLoggingIn={false} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App