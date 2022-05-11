import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { leaderboardAtom } from "@/atoms/leaderboardAtom.js";
import { server } from "@/config/server";
import Dropdown from "@/components/Dropdown";
import Header from "@/components/Header";
import Table from "@/components/Table";
import useFetchLeaderboard from "@/components/useFetchLeaderboard";
import { leaderboardSelectAtom } from "@/atoms/leaderboardSelectAtom";

function Leaderboard() {
    const lbData = useFetchLeaderboard()
    const options = Object.keys(lbData);
    const leaderboardSelect = useRecoilValue(leaderboardSelectAtom);
    const [activePlayers, setPlayers] = useRecoilState(leaderboardAtom)
    
    useEffect(async () => {
        const Players = {}
        let i = 0
        const players = lbData[leaderboardSelect];
        for (const player in players) {
            const playerData = players[player];
            const res = await fetch(`${server}/api/getDiscordUser?id=${playerData.playerId}`);
            const userData = await res.json();
            Players[userData.id] = userData.username
        
            i++
        }
        return setPlayers([Players, i])
        
    }, [leaderboardSelect, lbData])

    return (
        <div >
            <Header content="Leaderboard" />
            <Dropdown options={options} title="Select gamemode" atom={leaderboardSelectAtom} />
            {activePlayers?.[1] === lbData[leaderboardSelect]?.length  ? (
                <Table gamemode={leaderboardSelect} lbData={lbData} activePlayers={activePlayers?.[0]} />
            ) : (null)}

            {leaderboardSelect && activePlayers?.[1] != lbData[leaderboardSelect]?.length? (
                <img className="h-20 w-20" src="/loading.gif" />
            ):( null )}
        </div>
    )
}

export default Leaderboard
