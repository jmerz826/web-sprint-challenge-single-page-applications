import React, {useState, useEffect} from "react";
import { Route, Link, Switch } from "react-router-dom";
import PizzaForm from './components/pizzaForm';

const initialFormValues = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
};

const initialFormErrors = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
}


const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  
  const onChange = (name, value) => {
    setFormValues({...formValues, [name]: value})
  }

  return (
    <>
      <h1>Lambda Eats</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/pizza'>Pizza!</Link>
        <Link to='/help'>Help</Link>
      </nav>

      <Switch>
        <Route path='/pizza'>
          <PizzaForm
            values={formValues}
            errors={formErrors}
            onChange={onChange}
          />
        </Route>
        <Route path='/help'>
          <h3>Hit up @austen on twitter for help</h3>
        </Route>
        <Route path exact='/'>
          <h2>Home Page chillin!</h2>
        </Route>
      </Switch>
    </>
  );
};
export default App;
