import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Index';
import Navbar from './core/components/Navbar';
import Catalog from './pages/Catalog/Index';
import Admin from './pages/Admin/Index';
import ProductDetails from './pages/Catalog/components/ProductDetails/Index';
import Auth from './pages/Auth';
import history from 'core/utils/history';


const Routes = () => (
    <Router history={history}>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalog />
            </Route>
            <Route path="/products/:productId">
                <ProductDetails />
            </Route>
            <Redirect from="/auth" to="auth/login" exact />
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="admin/products" exact />
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </Router>

);

export default Routes;