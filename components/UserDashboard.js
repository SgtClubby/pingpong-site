import { useEffect, useState } from "react";
import Header from "@/components/Header"
import useFetchLeaderboard from "@/components/useFetchLeaderboard";
import UserManagementPanel from "@/components/UserManagementPanel";

function UserDashboard() {
    const [users, setUsers] = useState({});
    const lbData = useFetchLeaderboard()
    useEffect(async () => {
        const data = {}
        for (const [key, value] of Object.entries(lbData)) {
            data[key] = value
        }   
        setUsers(data);
    }, [lbData])

    return (
        <>
            <Header content="User Dashboard" />
            <UserManagementPanel users={users}/>
        </>
    )
}

export default UserDashboard
