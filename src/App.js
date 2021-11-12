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

const StyledHomePhoto = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  img{
    width: 50%;
  }

  a{
    text-decoration: none;
    font-size:2rem;
    color: black;
    background-color: greenyellow;
    padding:1%;
    margin-top: 2%;
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

    axios.post('https://reqres.in/api/orders', newPizza)
      .then(res => {
        setOrder([res.data, ...order])
      })
      .catch(err => console.error(err))
      .finally(() => {
        setFormValues(initialFormValues);
        routeToConfirmation();
      })
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  // useEffect(() => {
  //   axios.get('https://reqres.in/api/orders')
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err))
  // }, [formValues])

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
          <h3>Contact <a href='https://twitter.com/Austen' target='_blank'>@austen</a> on <a href='https://twitter.com/' target='_blank'>twitter</a> for help</h3>
          <a href='https://twitter.com/Austen' target='_blank'><img src='https://pbs.twimg.com/profile_images/1430366450053652480/uRMrWCcc_400x400.jpg' alt='Austen twitter pic' /></a>
        </Route>
        <Route path='/confirmation'>
          <ConfirmationPage>
            order={order}
          </ConfirmationPage>
        </Route>
        <Route exact path='/'>
          <h2>Home Page!</h2>
          <StyledHomePhoto>
          <img id='home-page-photo' src='https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt='Restaurants in a city'/>
          <Link to="/pizza" id="order-pizza">Order Pizza!</Link>
          </StyledHomePhoto>
        </Route>
      </Switch>
    </>
  );
};
export default App;
