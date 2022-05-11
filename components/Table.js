function Table({gamemode, activePlayers, lbData, content}) {
    return (
        <div className="mt-5 mr-4">
        {gamemode ? (
            <table className="bg-gray-800 w-20 rounded-md space-x-3 table-auto text-gray-300 md:text-xl">
                <thead>
                    <tr>
                        {content ? (null) : (
                            <th className="px-5 md:px-10 py-2">#</th>
                        )}
                        <th className="px-5 md:px-10 py-2">Name</th>
                        <th className="px-5 md:px-10 py-2 text-purple-400">Played</th>
                        <th className="px-5 md:px-10 py-2 text-green-400">Wins</th>
                        <th className="px-5 md:px-10 py-2 text-red-400">Losses</th>
                    </tr>
                </thead>
                <tbody>
                    {lbData[gamemode]?.map((player, index) => (
                        <tr key={player.playerId}>
                            {content ? ( null ) : (
                                <td className="px-5 md:px-10 py-2">{index + 1}</td>
                            )}
                            <td className="px-5 md:px-10 py-2">{lbData[gamemode][index].nickname ?? activePlayers?.[player.playerId]}</td>
                            <td className="px-5 md:px-10 py-2">{player.played}</td>
                            <td className="px-5 md:px-10 py-2">{player.wins}</td>
                            <td className="px-5 md:px-10 py-2">{player.lost}</td>
                        </tr> 
                                
                       ))}
                </tbody>
            </table>
            ) : ( null )}
        </div>
    )
}

export default Table

