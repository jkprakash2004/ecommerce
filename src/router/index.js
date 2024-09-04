import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import Home from "../pages/Home";
import ProductDetails from "../component/ProductDetails";
import AllCartdisplay from "../component/allCartdisplay";
import Sign from "../pages/Sign";
const router=createBrowserRouter([
    {
        path:"",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },            
            {
                path:"sign",
                element:<Sign/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path:"product/allCartProduct",
                element:<AllCartdisplay/>
            }
        ]
    }
])

export default router;