import Inbox from "./pages/inbox";
import Dashboard from "./pages/dashboard";

const routes = [
    { path: '/', name: 'dashboard', element: Dashboard},
    { path: '/inbox', name: 'inbox', element: Inbox}
]
export default routes;