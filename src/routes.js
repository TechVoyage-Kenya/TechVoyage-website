import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { LandingPage } from "./pages/LandingPage";
import { TasksBoard } from "./pages/TasksBoard";
import OurServicesPage from "./pages/OurServicesPage";
import OurTeamPage from "./pages/OurTeam";
import Projects from "./pages/Projects";
import ContactUs from "./pages/ContactUs";
import SignInPage from "./pages/SignIn";
import ProtectedRoute from "./components/layout/protectedRoutes";

const routes = [
    { path: "/", 
    element: <App /> ,
    errorElement:<ErrorPage/>,
        children:[
            {path:"/",element:<LandingPage/>},
            {
                path:"/tasksBoard",
                element: <ProtectedRoute element={<TasksBoard />} />,
            },
            {
                path:"/ourServices",
                element:<OurServicesPage/>
            },{
                path:"/ourTeam",
                element:<OurTeamPage/>
            },{
                path:"/projects",
                element:<Projects/>
            },{
                path:"/contactUs",
                element:<ContactUs/>
            },{
                path:"/adminLogin",
                element:<SignInPage/>
            }

        ]
}];

export { routes };
