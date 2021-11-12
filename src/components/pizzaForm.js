import React from "react";
import styled from 'styled-components';

// Form styling
const StyledFormDiv = styled.div`
    
    display:flex;
    flex-direction:column;
    align-items:center;

    h3{
        width:100%;
        text-align:center;
        margin-bottom:5%;
        padding-bottom:2%;
        border-bottom: 2px dashed black;
    }

    h4{
        margin-top: 0;
    }
    
    /* BACKGROUND IMAGE */
    background-image: url('https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_960_720.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    #pizza-form {
        display:flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(224, 255, 225, 0.7);
        padding: 2% 10%;
    }

    #toppings-list{
        display:flex;
        flex-direction:column;
        align-items:center;
    }

    button{
        margin-top: 10%;
    }

    .error-text{
        text-transform: uppercase;
        color:yellow;
    }
    
`

const PizzaForm = (props) => {
    const { values, errors, onChange, disabled, submit } = props;
    

    const change = (evt) => {        
        const { name, value, type, checked } = evt.target;
        const newValue = type === 'checkbox' ? checked : value;
        onChange(name, newValue);
    }

    return (
        <StyledFormDiv>
            <h2>Design your Pizza!</h2>
            <h4>Our pizza is cooked fresh to order!</h4>
            <form id='pizza-form' onSubmit={submit}>
                <h3>Your Name </h3>
                <span className='error-text'>{errors.name}</span>
                    <input
                        name='name'
                        type='text'
                        value={values.name}
                        id='name-input'
                        onChange={change}
                    />
                
                <h3>Size</h3>
                <span className='error-text'>{errors.size }</span>
                    <select
                        onChange={change}
                        value={values.size}
                    name='size'
                    id='size-dropdown'
                    >
                        <option value=''>-- Select Pizza Size --</option>
                        <option value='small'>Small (10")</option>
                        <option value='medium'>Medium (12")</option>
                        <option value='large'>Large (16")</option>
                        <option value='extra-large'>Extra Large (18")</option>
                    </select>
                
                <h3>Sauce</h3>
                <span className='error-text'>{errors.sauce}</span>
                    <label> Marinara
                        <input
                            type='radio'
                            name='sauce'
                            value='marinara'
                            onChange={change}
                            checked={values.sauce === 'marinara' }
                        />
                    </label>
                    <label> BBQ Sauce
                        <input
                            type='radio'
                            name='sauce'
                            value='bbq'
                            onChange={change}
                            checked={values.sauce === 'bbq' }
                        />
                    </label>
                    <label> Alfredo (White) Sauce
                        <input
                            type='radio'
                            name='sauce'
                            value='alfredo'
                            onChange={change}
                            checked={values.sauce === 'alfredo' }
                        />
                    </label>
                <h3>Add Toppings (optional)</h3>
                <span className='error-text'>{errors.toppings}</span>
                    <div id='toppings-list'>
                        <label> Pepperoni
                            <input
                                type='checkbox'
                                name='pepperoni'
                                onChange={change}
                                checked={values.pepperoni}
                            />
                        </label>
                        <label> Sausage
                            <input
                                type='checkbox'
                                name='sausage'
                                onChange={change}
                                checked={values.sausage}
                            />
                        </label>
                        <label> Bacon
                            <input
                                type='checkbox'
                                name='bacon'
                                onChange={change}
                                checked={values.bacon}
                            />
                        </label>
                        <label> Grilled Chicken
                            <input
                                type='checkbox'
                                name='chicken'
                                onChange={change}
                                checked={values.chicken}
                            />
                        </label>
                        <label> Red Onions
                            <input
                                type='checkbox'
                                name='onions'
                                onChange={change}
                                checked={values.onions}
                            />
                        </label>
                        <label> Black Olives
                            <input
                                type='checkbox'
                                name='olives'
                                onChange={change}
                                checked={values.olives}
                            />
                        </label>
                    </div>
                <h3>Special Instructions</h3>
                <span className='error-text'>{errors.instructions}</span>
                <label>
                    <input
                        type='text'
                        name='instructions'
                        value={values.instructions}
                        onChange={change}
                        id='special-text'
                    />
                </label>
                <button
                    disabled={disabled}
                    id='order-button'
                    type='submit'
                >Add 🍕 to Order! </button>
            </form>

        </StyledFormDiv>
    )
}

export default PizzaForm;