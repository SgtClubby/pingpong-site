import { HomeIcon, LoginIcon, LogoutIcon, MenuIcon, TerminalIcon, UserGroupIcon, UserIcon, ViewListIcon, XIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { collapsedAtom } from "/atoms/collapseAtom";
import { stateAtom } from "/atoms/stateAtom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

function Sidebar({ isAdmin }) {
    const { data: session, status } = useSession()

    const [collapsed, setCollapsed] = useRecoilState(collapsedAtom);
    const [selected, setSelected] = useRecoilState(stateAtom);

    return (
        <div className={classNames(
            collapsed === true ? 'animate-slide-in z-10' : 'animate-slide-out z-10'
        )}>
        <div className=" fixed xl:max-w-2xl">
        <aside className="w-64" aria-label="Sidebar">
            { collapsed === true ? (
                <MenuIcon className="animate-rotate-forwards-180 z-20 absolute w-8 h-8 ml-[13.2rem] cursor-pointer mt-4 text-gray-300" onClick={() => setCollapsed(false)}/>
            ) : (
                <XIcon className="animate-rotate-backwards-180 z-20 absolute w-8 h-8 ml-[13.2rem] cursor-pointer mt-4 text-gray-300" onClick={() => setCollapsed(true)}/>
            )}
            {session && (
                 <div className="sidebar-sidebar-header">
                    <Image className="rounded-xl drop-shadow-2xl" src={session?.user.image} width={50} height={50}/>
                    <div>
                        <h1 className="ml-3 text-[1.7rem]">{session?.user.name}</h1>
                        { isAdmin && (
                            <h3 className="ml-3 mt-1 text-[1rem] text-red-300">Admin</h3>
                        )}
                    </div>
                 </div>
            )}
            
            <div className="px-3 py-4 overflow-y-auto h-fit max-h-[70vh] scrollbar-hide pb-5 rounded-br-xl text-w drop-shadow-2xl bg-gray-800">
                <ul className="space-y-3">
                <>
                    <li>
                        <button onClick={() => { setSelected("Home"); setCollapsed(true)}} className={classNames(
                                    selected === "Home" ? 'sidebar-button-active' : 'sidebar-button'
                                )}>
                            <HomeIcon className="sidebar-icon" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                        </button>
                    </li>
                    {session && (
                        <li>
                        <button onClick={() => { setSelected("Your Profile"); setCollapsed(true)}} className={classNames(
                                    selected === "Your Profile" ? 'sidebar-button-active' : 'sidebar-button'
                                )}>
                            <UserIcon className="sidebar-icon" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Your Profile</span>
                        </button>
                    </li>
                    )}
                    {!session && (
                        <li>
                            <button onClick={signIn} className="sidebar-button">
                                <LoginIcon className="sidebar-icon" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                            </button>
                        </li>
                    )}
                    
                    {session && isAdmin ? (
                        <>
                            <li>
                                <button onClick={() => {setSelected("User Dashboard"); setCollapsed(true)}} className={classNames(
                                    selected === "User Dashboard" ? 'sidebar-button-active' : 'sidebar-button'
                                )}>
                                    <UserGroupIcon className="sidebar-icon" />
                                    <span className="flex-1 ml-3 whitespace-nowrap">User Dashboard</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => {setSelected("Admin Dashboard"); setCollapsed(true)}} className={classNames(
                                    selected === "Admin Dashboard" ? 'sidebar-button-active' : 'sidebar-button'
                                )}>
                                    <TerminalIcon className="sidebar-icon" />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Admin Dashboard</span>
                                </button>
                            </li>   
                         </>                     
                        ) : (null)}
                        
                            {session && (
                            <>
                                <li>
                                    <button onClick={() => { setSelected("Leaderboard"); setCollapsed(true)}} className={classNames(
                                        selected === "Leaderboard" ? 'sidebar-button-active' : 'sidebar-button'
                                    )}>
                                        <ViewListIcon className="sidebar-icon"/>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Leaderboard</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={signOut} className="sidebar-button">
                                        <LogoutIcon className="sidebar-icon"/>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                                    </button>
                                </li>
                            </>
                            )}
                        </>
                </ul>
            </div>
        </aside>
        </div>
        </div>
    )
}

export default Sidebar
