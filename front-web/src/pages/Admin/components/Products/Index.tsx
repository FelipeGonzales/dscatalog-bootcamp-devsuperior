import {Route, Switch} from 'react-router-dom'
import List from './List/Index';
import Form from './Form/Index';

const Products = () => {
    return (
        <div>

            <Switch>
                <Route path="/admin/products" exact>
                    <List />
                </Route>
                
                <Route path="/admin/products/:productId">
                    <Form/>
                </Route>
            </Switch>
        </div>
    );
}

export default Products;