import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}