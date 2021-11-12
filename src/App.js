import React, {useState, useEffect} from "react";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import PizzaForm from './components/pizzaForm';
import formSchema from "./components/form.schema";
import axios from "axios";
import * as yup from 'yup';
import styled from 'styled-components';
import ConfirmationPage from "./components/confirmationPage";

// Styling for site header
const StyledHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  background-color: lightcyan;

  h1{
    font-style: italic;
  }

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
//Styling for the photo on the home page
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

//Styling for help page
const StyledHelp = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;

  p{
    font-style: italic;
  }
`

// Setting initial form values to empty
const initialFormValues = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
  instructions: '',

  // topping checkboxes
  pepperoni: false,
  sausage: false,
  bacon: false,
  chicken: false,
  onions: false,
  olives: false  
};

// Setting inital form errors to empty 
const initialFormErrors = {
  name: '',
  size: '',
  sauce: '',
  toppings: '',
  instructions: ''
}

// Makes submit button unclickable (prior to successful form validation)
const initialDisabled = true;

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [order, setOrder] = useState([]);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

  // On invocation, will send user to confirmation page
  const routeToConfirmation = () => {
        history.push('/confirmation');
  }
  
  // Validation function. Passes each name/value pair through the schema linked at the top
  // If does not pass, set Form Error to appropriate error
  const validate = (name, value) => {
    yup.reach(formSchema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  // Will be invoked each time a value on the form changes
  // Constantly checking/confirming validation status
  const onChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value})
  }

  // Invoked upon form submission
  const onSubmit = (evt) => {
    // Stops page from refreshing (default behavior)
    evt.preventDefault();
    //Creates new temporary object, solely to be pushed into 'order' state
    const newPizza = {
      name: formValues.name,
      size: formValues.size,
      sauce: formValues.sauce,
      toppings: formValues.toppings,
      instructions: formValues.instructions,

      // toppings
      pepperoni: formValues.pepperoni,
      sausage: formValues.sausage,
      bacon: formValues.bacon,
      chicken: formValues.chicken,
      onions: formValues.onions,
      olives: formValues.olives
    }

    // When form is submitted, inject new temporary 'pizza' object into database
    axios.post('https://reqres.in/api/orders', newPizza)
      .then(res => {
        setOrder([res.data, ...order])
      })
      .catch(err => console.error(err))
      .finally(() => {
        // Reset form inputs to blank 
        setFormValues(initialFormValues);
        // Send user to confirmation page
        routeToConfirmation();
      })
  }

  useEffect(() => {
    // Each time formValues is changed (everytime user inputs anything to form), form is checked for validation
    // Submit button becomes disabled if schema is met
    formSchema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  return (
    <>
      {/* Header, containing links to different routes */}
      <StyledHeader>
        <h1>Lambda Eats</h1>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Pizza!</Link>
          <Link to='/help'>Help</Link>
        </nav>
      </StyledHeader>

      <Switch>
        {/* reached when successful order is placed. Not reachable through internal site */}
      <Route path='/confirmation'>
          <ConfirmationPage order={order}/>
        </Route>
        {/* Pizza form reached when user clicks 'Pizza!', or 'Order Pizza!' button on home page */}
        <Route path='/pizza'>
          <PizzaForm
            values={formValues}
            errors={formErrors}
            onChange={onChange}
            disabled={disabled}
            submit={onSubmit}
          />
        </Route>
        {/* Sends user to VERY helpful help page when 'Help' button is clicked */}
        <Route path='/help'>
          <StyledHelp>
            <h3>Contact <a href='https://twitter.com/Austen' target='_blank'>@austen</a> on <a href='https://twitter.com/' target='_blank'>twitter</a> for help</h3>
            <a href='https://twitter.com/Austen' target='_blank'><img src='https://pbs.twimg.com/profile_images/1430366450053652480/uRMrWCcc_400x400.jpg' alt='Austen twitter pic' /></a>
            <p>He may or may not be able to help you with your pizza issue</p>
          </StyledHelp>
        </Route>
        {/* default landing page */}
        <Route exact path='/'>
          <h2>Home Page!</h2>
          <StyledHomePhoto>
          <img id='home-page-photo' src='https://images.pexels.com/photos/1115251/pexels-photo-1115251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt='Restaurants in a city'/>
          <Link to="/pizza" id="order-pizza">Order Pizza!</Link>
          </StyledHomePhoto>
        </Route>
      </Switch>
      {/* totally legit copyright in the footer */}
      <footer>
        <p>Copyright: John Merz, Lambda Super Llama, 2021 ©</p>
      </footer>
    </>
  );
};
export default App;
