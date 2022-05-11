import { signIn, useSession } from "next-auth/react"
import Header from "@/components/Header"

function Home() {
    const { data: session, status } = useSession()

    return (
        <>
            {session ? (
                <>
                    <Header content={`Welcome, ${session?.user.name}`} />
                    <p className="text-gray-300 text-2xl">
                        Hello, {session.user.name}!
                    </p>
                </>
            ) : (
                <div className="text-gray-300">
                    <Header content="Home" />
                    <p className="text-gray-300 text-2xl">
                        Hey! You are not signed in, click here to <a className="text-blue-300 cursor-pointer" onClick={signIn}>Sign in</a> using discord.
                    </p>
                </div>
            )}
        </>
    )
}

export default Home
