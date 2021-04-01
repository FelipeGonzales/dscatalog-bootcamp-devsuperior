import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Navbar from './core/components/Navbar';
import Catalog from './pages/Catalog/Index';
import Admin from './pages/Admin/Index';


const Routes = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/catalog">
                <Catalog />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>

);

export default Routes;