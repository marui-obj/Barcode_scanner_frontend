import Menu from "./pages/Menu";
import PutAwayQrcode from "./pages/PutAwayQrcode";
import DispatchIndex from "./pages/DispatchIndex"
import DispatchDetail from "./pages/DispatchDetail";
import AddNewItem from "./pages/AddNewItem";
import PutAwayScanLocation from "./pages/PutAwayScanLocation";
import DispatchQrcode from "./pages/DispatchQrcode";

const routes = [
    {path: '/', exact: true, name: "Main-Menu", component: Menu},
    {path: '/put-away', exact: true, name: "Put-Away", component: PutAwayQrcode},
    {path: '/put-away/scan-location', exact: true, name: "Put-Away-Location", component: PutAwayScanLocation},
    {path: '/add-item', exact: true, name: "Add-Item", component: AddNewItem},
    {path: '/dispatch', exact: true, name: "Dispatch-index", component: DispatchIndex},
    {path: '/dispatch/:id', exact: true, name: "Dispatch-detail", component: DispatchDetail},
    {path: '/dispatch/scan', exact: true, name: "Dispatch-scan", component: DispatchQrcode}
]

export default routes;