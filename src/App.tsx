import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {
    LandingPage,
    About,
    Pricing,
    Contact,
    Login,
    Signup,
    AddTrade,
    Dashboard,
    TradeLog,
    BrokerLogin,
    Stats,
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
    AddTradeLanding,
    AddTradeFileReader,
    ScreenerLayout,
    HodScreener,
    ScreenerDashboard,
} from "./components"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {login} from "./features/userSlice"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import Loading from "./Loading"
import SiteLayout from "./SiteLayout"
import NewLayout from "./components/Screeners/CustomLayouts/NewLayout"

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
                            element: <Stats />,
                        },
                        {
                            path: "addtrade",
                            children: [
                                {
                                    index: true,
                                    element: <AddTradeLanding />,
                                },
                                {
                                    path: "addtradefile",
                                    element: <AddTradeFileReader />,
                                },
                                {
                                    path: "addtradeform",
                                    element: <AddTrade />,
                                },
                            ],
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
                    path: "about",
                    element: <About />,
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
                    path: "userpage",
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
                        {
                            path: "hod",
                            element: <HodScreener />,
                        },
                    ],
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

export default App
