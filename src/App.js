import React, {useState, useEffect} from "react";
import { Route, Link, Switch } from "react-router-dom";
import PizzaForm from './components/pizzaForm';
import formSchema from "./components/form.schema";

const initialFormValues = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',

  // topping checkboxes
  pepperoni: false,
  sausage: false,
  bacon: false,
  chicken: false,
  onions: false,
  olives: false,
};

const initialFormErrors = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
}

const initialDisabled = true;

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [order, setOrder] = useState([]);
  const [disabled, setDisabled] = useState(initialDisabled);
  
  const onChange = (name, value) => {
    setFormValues({...formValues, [name]: value})
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newPizza = {
      name: formValues.name,
      size: formValues.size,
      sauce: formValues.sauce,
      toppings: formValues.toppings,

      // toppings
      pepperoni: formValues.pepperoni,
      sausage: formValues.sausage,
      bacon: formValues.bacon,
      chicken: formValues.chicken,
      onions: formValues.onions,
      olives: formValues.olives,
    }
    setOrder(newPizza);
    setFormValues(initialFormValues);
  }

  // useEffect(() => {
  //   schema.isValid(formValues).then(valid => setDisabled(!valid));
  // }, [formValues])

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
            disabled={disabled}
            submit={onSubmit}
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
