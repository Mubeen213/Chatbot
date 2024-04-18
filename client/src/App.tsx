import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Login} from "@/pages/Login.tsx";
import {SetupOrganization, action as setupOrgAction} from "@/pages/SetupOrganization.tsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/setup',
        element: <SetupOrganization/>,
        action: setupOrgAction
    }
])

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
