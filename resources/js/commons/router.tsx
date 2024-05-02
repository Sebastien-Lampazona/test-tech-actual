import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@layouts/DashBoard";
import ErrorLayout from "@layouts/Error";
import CandidatsList from "@pages/Candidats/List";
import CandidatAdd from "@pages/Candidats/Add";
import CandidatEdit from "@pages/Candidats/Edit";

export default createBrowserRouter([
    {
        element: <DashboardLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/candidats" />
            },
            {
                path: "/candidats",
                children: [
                    {
                        path: "",
                        element: <CandidatsList />,
                    },
                    {
                        path: "add",
                        element: <CandidatAdd />,
                    },
                    {
                        path: ":id",
                        element: <CandidatEdit />,
                    }
                ]
            },
        ]
    },
    {
        path: "*",
        element: <ErrorLayout />,
    }
]);
