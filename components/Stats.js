import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { statsAtom } from "@/atoms/statsAtom"
import { server } from "@/config/server.js"
import Dropdown from "@/components/Dropdown"
import Header from "@/components/Header"
import Table from "@/components/Table"
import { statsSelectAtom } from "@/atoms/statsSelectAtom"

function Stats({ userData }) {
    const { data: session, status } = useSession()

    const [stats, setStats] = useState({})
    const [user, setUser] = useState(userData)

    const options = Object.keys(stats);
    const statsSelect = useRecoilValue(statsSelectAtom);

    const [activePlayers, setPlayers] = useRecoilState(statsAtom)

    useEffect(async () => {
        const res = await fetch(`${server}/api/getUser?name=${session?.user.name}`)
        const data = await res.json()
        setUser(data)
    }, [])
    
    useEffect(async () => {
        const res = await fetch(`${server}/api/getUserStats?id=${session?.user.id}`)
        const data = await res.json()
        setStats(data)
    }, [])

    useEffect(async () => {
        const Players = {}
        const res = await fetch(`${server}/api/getDiscordUser?id=${session?.user.id}`);   
        const data = await res.json();   
        Players[session?.user.id] = data.username
        
        return setPlayers(Players)
    }, [statsSelect])

    for (const game in stats) {
        if (stats[game].length === 0) {
            delete stats[game]
        }
    }

    const nicknameRef = useRef("")
    console.log(nicknameRef?.current?.value)
    var length = Object.keys(stats);

    return (
        <>
        <Header content="Your Profile" />
        {length.length === 0 ? (
            <div>
                <h1 className="text-gray-300">You aren't participating in any game!</h1>
            </div>
        ) : (
            <div className="text-gray-300">
                <Dropdown options={options} title="Select gamemode" atom={statsSelectAtom}/>
                <Table gamemode={statsSelect} lbData={stats} activePlayers={activePlayers} content="Your stats" hideDeets={true} />
            </div>
        )}
        <div className="mt-10">
            <Header content="Change nickname" />
            {user.nickname ? (
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="flex-grow">
                            <h1 className="text-gray-300">Your nickname is {user.nickname}</h1>
                        </div>
                        <div className="flex-grow">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => {
                                setUser({...user, nickname: ""})
                                fetch(`${server}/api/setNickname?name=${session?.user.name}&id=${session?.user.id}&nickname=""`)
                            }}>
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="flex-grow">
                            <h1 className="text-gray-300">Enter your new nickname</h1>
                        </div>
                        <div className="flex-grow">
                            <input className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" type="text" ref={nicknameRef} />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex-grow">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => {
                                setUser({...user, nickname: nicknameRef.current.value})
                                fetch(`${server}/api/setNickname?name=${session?.user.name}&id=${session?.user.id}&nickname=${nicknameRef.current.value}`)
                            }}>
                                Set
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        </>
    )
}

export default Stats
