//Configurações das rotas
import { createBrowserRouter } from "react-router-dom";

import Home from "./home/Home";
import Details from "./details/Details";
import NotFound from "./notFound/NotFound";
import Layout from '../components/layout/Layout'

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/details/:cripto',
                element: <Details />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
])

export { router }