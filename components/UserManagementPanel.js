import { useEffect, useState } from "react"
import { server } from "@/config/server";

function UserManagementPanel({ users }) {
    const [playerNames, setPlayerNames] = useState({});
    const [callback, setCallback] = useState(null);

    const [callbacktShown, setCallbackShown] = useState({});

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const toggleComment = (id) => {
        setCallbackShown({})
        setCallbackShown(prev => Boolean(!prev[id]) ? {...prev, [id]: true} : {...prev, [id]: false});
    };

    // fetch discord names from discord using IDs
    useEffect(async () => {
        const data = {}
        for (const [key, value] of Object.entries(users)) {
            for (let i = 0; i < value.length; i++) {
                const res = await fetch(`${server}/api/getDiscordUser?id=${value[i].playerId}`);
                const userData = await res.json();
                data[value[i].playerId] = userData.username
            }
        }
        setPlayerNames(data)

    }, [users])

    let timeout = null;

    const updateScores = async (newData, key) => {
        const res = await fetch(`${server}/api/updateScore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        const data = await res.json();

        if (data.acknowledged) {
            setCallback(`${data.message}`)
            toggleComment(key)
        } else {
            setCallback(`${data.error} ${playerNames?.[data.id]}`)
            toggleComment(key)
        }

        clearTimeout(timeout)
        invokeTimeout() 

    }

    function invokeTimeout() {
        timeout = setTimeout(() => {
            setCallback(null)
            toggleComment(null)
        }, 5000)
    }
    
    function inputChangeHandler(event) {
        event.preventDefault();
        toggleComment("")
        let { name, value } = event.target;
        const playerId = name.split("-")[2];
        const gamemode = name.split("-")[0];
        const valueName = name.split("-")[1];

        if (value.length === 0) {
            value = "0"
        }

        const playerData = {
            playerId: playerId,
            data: {valueName: valueName, value: value},
            gamemode: gamemode
        }

        updateScores(playerData, gamemode)
    }

    return (
        <>
        {Object.keys(playerNames).length === 0 ? (
            <div className="flex flex-inline h-16 w-fit items-center">
                <p className="pr-5 text-[1.7rem] text-gray-300">Fetching data...</p>
                <img className="h-16 w-16" src="/loading.gif" />
            </div>
        ) : (

            <div className="grid-wrap">
            {Object.entries(users).map(([key, value]) => (
                <div key={key} className="relative flex flex-col">
                    <h2 className="text-gray-300 pl-4 mb-2 text-xl">{capitalize(key)}</h2>
                    <table className="bg-gray-800 rounded-md space-x-3 mb-3 text-gray-300 text-xl">
                        <thead>
                            <tr>
                                <th className="px-10 py-2 text-yellow-500">#</th>
                                <th className="w-40">Name</th>
                                <th className="px-10 py-2 text-purple-400">Played</th>
                                <th className="px-10 py-2 text-green-400">Wins</th>
                                <th className="px-10 py-2 text-red-400">Losses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {value.map((player, index) => (
                                <tr key={player.playerId}>
                                    <td className="px-10 py-2">{index + 1}</td>
                                    <td className="w-40 text-center">{playerNames?.[player.playerId] ?? <div className="inline-flex items-center"><img className="h-4 w-4 mr-5" src="/loading.gif"/> <p className="text-[1rem]">Loading...</p></div>}</td>

                                    <td className="px-10 py-2">
                                        <input className="bg-gray-800 w-20 text-center" type="number" name={`${key}-played-${player.playerId}`} onChange={(e) => inputChangeHandler(e)} defaultValue={player.played} />
                                    </td>
                                    <td className="px-10 py-2">
                                        <input className="bg-gray-800 w-20 text-center" type="number" name={`${key}-wins-${player.playerId}`}   onChange={(e) => inputChangeHandler(e)} defaultValue={player.wins} />
                                    </td>
                                    <td className="px-10 py-2">
                                        <input className="bg-gray-800 w-20 text-center" type="number" name={`${key}-lost-${player.playerId}`}   onChange={(e) => inputChangeHandler(e)} defaultValue={player.lost} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>  
                    { callbacktShown[key] ? <p className="absolute ml-[10rem] text-gray-300 text-xl">{callback}</p> : null }

                </div>
            ))}
        </div>
        )}
        </>
        )
}

export default UserManagementPanel