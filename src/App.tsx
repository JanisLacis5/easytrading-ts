import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {
    LandingPage,
    Pricing,
    Contact,
    Login,
    Signup,
    Dashboard,
    TradeLog,
    BrokerLogin,
    StatsLayout,
    Calendar,
    SignupInfoForm,
    SignupLayout,
    UserPage,
    UserUpdateForm,
    UserPricingPlan,
    UserNotes,
    UserDangerZone,
    AddNote,
    DashboardNotes,
    ScreenerLayout,
    HodScreener,
    ScreenerDashboard,
    AddTrade,
    ChatroomLayout,
} from "./components"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {login} from "./features/userSlice"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import Loading from "./Loading"
import SiteLayout from "./SiteLayout"
import NewLayout from "./components/Screeners/CustomLayouts/NewLayout/NewLayout"
import GapBlock from "./components/Screeners/CustomLayouts/ScreenerBlocks/GapBlock"
import ChangePasswordForm from "./components/User/UserDangerZone/ChangePasswordForm"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const user = localStorage.getItem("user")
            if (user) {
                dispatch(login(JSON.parse(user)))
            }
        } catch {
            return
        }
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <SiteLayout />,
            children: [
                {
                    path: "loading",
                    element: <Loading />,
                },
                {
                    path: "dashboard",
                    element: <DashboardLayout />,
                    children: [
                        {
                            index: true,
                            element: <Dashboard />,
                        },
                        {
                            path: "stats",
                            element: <StatsLayout />,
                        },
                        {
                            path: "addtrade",
                            element: <AddTrade />,
                        },
                        {
                            path: "calendar",
                            element: <Calendar />,
                        },
                        {
                            path: "log",
                            element: <TradeLog />,
                        },
                        {
                            path: "brokerlogin",
                            element: <BrokerLogin />,
                        },
                        {
                            path: "notes",
                            element: <DashboardNotes />,
                        },
                    ],
                },
                {
                    path: "landing",
                    element: <LandingPage />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "signup",
                    element: <SignupLayout />,
                    children: [
                        {
                            index: true,
                            element: <Signup />,
                        },
                        {
                            path: "form",
                            element: <SignupInfoForm />,
                        },
                    ],
                },
                {
                    path: "pricing",
                    element: <Pricing />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
                {
                    path: "user-page",
                    element: <UserPage />,
                    children: [
                        {
                            index: true,
                            element: <UserUpdateForm />,
                        },
                        {
                            path: "pricing",
                            element: <UserPricingPlan />,
                        },
                        {
                            path: "notes",
                            element: <UserNotes />,
                        },
                        {
                            path: "danger",
                            element: <UserDangerZone />,
                        },
                        {
                            path: "addnote",
                            element: <AddNote />,
                        },
                        {
                            path: "change-password",
                            element: <ChangePasswordForm />,
                        },
                    ],
                },
                {
                    path: "screeners",
                    element: <ScreenerLayout />,
                    children: [
                        {
                            index: true,
                            element: <ScreenerDashboard />,
                        },
                        {
                            path: "new-layout",
                            element: <NewLayout />,
                        },
                    ],
                },
                {
                    path: "hod",
                    element: <HodScreener />,
                },
                {
                    path: "gap",
                    element: <GapBlock />,
                },
                {
                    path: "chatroom",
                    element: <ChatroomLayout />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

export default App
