import Menu from "./pages/Menu";
import PutAway from "./pages/PutAway";
import DispatchIndex from "./pages/DispatchIndex"
import DispatchDetail from "./pages/DispatchDetail";

const routes = [
    {path: '/', exact: true, name: "Main-Menu", component: Menu},
    {path: '/put-away', exact: true, name: "Put-Away", component: PutAway},
    {path: '/dispatch', exact: true, name: "Dispatch-index", component: DispatchIndex},
    {path: '/dispatch/:id', exact: true, name: "Dispatch-detail", component: DispatchDetail}
]

export default routes;