import React, {useState, useEffect} from "react";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import PizzaForm from './components/pizzaForm';
import formSchema from "./components/form.schema";
import axios from "axios";
import * as yup from 'yup';
import styled from 'styled-components';
import ConfirmationPage from "./components/confirmationPage";

const StyledHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;

  nav{
    width:20%;
    display:flex;
    justify-content:space-evenly;
  }

  nav a{
    text-decoration: none;
    background-color: greenyellow;
    padding: 4%;
    border-radius:10px;
  }
`

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

  instructions: ''
};

const initialFormErrors = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
  instructions: ''
}

const initialDisabled = true;

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [order, setOrder] = useState([]);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

  const routeToConfirmation = () => {
        history.push('/confirmation');
  }
  
  const validate = (name, value) => {
    yup.reach(formSchema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const onChange = (name, value) => {
    validate(name, value);
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
    routeToConfirmation();
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  useEffect(() => {
    axios.get('https://reqres.in/api/orders')
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }, [formValues])

  return (
    <>
      <StyledHeader>
        <h1>Lambda Eats</h1>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Pizza!</Link>
          <Link to='/help'>Help</Link>
        </nav>
      </StyledHeader>

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
        <Route path='/confirmation'>
          <ConfirmationPage>
            order={order}
          </ConfirmationPage>
        </Route>
        <Route exact path='/'>
          <h2>Home Page chillin!</h2>
        </Route>
      </Switch>
    </>
  );
};
export default App;
