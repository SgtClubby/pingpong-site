import { useEffect, useState } from "react";
import { server } from "@/config/server";

function useFetchLeaderboard() {
    const [res, setRes] = useState([]);

    useEffect(async () => { 
        const lbData = await fetch(`${server}/api/getLeaderboard?gamemode=""`);
        const data = await lbData.json();
        setRes(data);
    }, []);

    return res
}

export default useFetchLeaderboard