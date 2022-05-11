import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { stateAtom } from "@/atoms/stateAtom";
import UserDashboard from "@/components/UserDashboard";
import Stats from "@/components/Stats";
import Leaderboard from "@/components/Leaderboard";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import AdminDashboard from "@/components/AdminDashboard";
import { server } from "@/config/server";

export async function getServerSideProps({ req, res }) {
  const session = await getSession({req})

  const userDatares = await fetch(`${server}/api/getUser?name=${session?.user.name}`)
  const userData = await userDatares.json()

  return {
    props: {
      session,
      userData
    },
  };
}

export default function Page({userData}) {
  const { data: session } = useSession()
  const selected = useRecoilValue(stateAtom);
  useEffect(() => {
      document.title = selected
  }, [selected])

  return (
    <div className="flex flex-row flex-cols-2 w-[60rem] xl:w-auto">
      <Sidebar isAdmin={session?.user.admin}/>
      <div className="flex-grow m-4 ml-[5.7rem]">
        {(() => {
          switch (selected) {
            case "Your Profile":
              return <Stats userData={userData} />
            case "User Dashboard":
              return <UserDashboard />
            case "Leaderboard":
              return <Leaderboard />
            case "Admin Dashboard":
              return <AdminDashboard />
            default:
              return <Home content="Home" />
          }
        })()}
      </div>
    </div>
  )
}
