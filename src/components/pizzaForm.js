import React from "react";
import styled from 'styled-components';

const StyledFormDiv = styled.div`
    display:flex;
    flex-direction:column;
    background-color: gray;
    align-items:center;
    
    /* BACKGROUND IMAGE */
    background-image: url('https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_960_720.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    #pizza-form {
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    
`

const PizzaForm = (props) => {
    const { values, errors, onChange } = props;

    const change = (evt) => {        
        const { name, value, type, checked } = evt.target;
        const newValue = type === 'checkbox' ? checked : value;
        onChange(name, newValue);
    }

    return (
        <StyledFormDiv>
            <h2>Design your Pizza!</h2>
            <form id='pizza-form'>
                <label>Your Name <span>{errors.name}</span></label>
                    <input
                        name='name'
                        type='text'
                        value={values.name}
                        id='name-input'
                        onChange={change}
                    />
                
                <label>Size <span>{errors.size }</span></label>
                    <select
                        onChange={change}
                        value={values.size}
                        name='size'
                    >
                        <option value=''>-- Select Pizza Size --</option>
                        <option value='small'>Small (10")</option>
                        <option value='medium'>Medium (12")</option>
                        <option value='large'>Large (16")</option>
                        <option value='extra-large'>Extra Large (18")</option>
                    </select>
                
                <label>Sauce <span>{errors.sauce}</span></label>
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
                <label>Add Toppings (optional) <span>{errors.toppings}</span></label>



            </form>

        </StyledFormDiv>
    )
}

export default PizzaForm;