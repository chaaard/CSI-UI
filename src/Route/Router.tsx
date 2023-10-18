import {
    createBrowserRouter,
    Route,
    createRoutesFromElements
} from 'react-router-dom';
import RootLayout from '../Layout/RootLayout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Grabmart from '../Pages/GrabMart/Grabmart';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path='grabmart' element={<Grabmart />}></Route>
        </Route>
    )
)

export default Router;