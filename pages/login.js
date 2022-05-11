import { getProviders, signIn } from "next-auth/react"

function login({ providers }) {
    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-gray-700 justify-center">
            <img className="w-30 drop-shadow-2xl mb-2" src="/discord.svg" />
            {Object.values(providers).map((provider) => (
                <div key={provider.id}>
                    <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className="relative inline-flex items-center justify-center px-16 py-3 overflow-hidden font-medium text-gray-300 transition duration-300 ease-out border-2 border-[#5865f2] rounded-2xl shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-gray-200 duration-300 -translate-x-full bg-[#5865f2] group-hover:translate-x-0 ease">
                        <p className="pr-4">Continue</p>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-gray-200 transition-all duration-300 transform group-hover:translate-x-full ease">Login with {provider.name}</span>
                        <span className="relative invisible">Continue</span>
                    </button>
                </div>
            ))}
        </div>
    )
}
export default login

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
    }
}
