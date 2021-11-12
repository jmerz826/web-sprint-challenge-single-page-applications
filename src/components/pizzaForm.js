import React from "react";
import styled from 'styled-components';

const StyledFormDiv = styled.div`
    display:flex;
    flex-direction:column;
    background-color: gray;
    align-items:center;

    img{
        height:20vh;
    }
`

const PizzaForm = (props) => {
    const { values, onChange } = props;

    const change = (evt) => {        
        const { name, value, type, checked } = evt.target;
        const newValue = type === 'checkbox' ? checked : value;
        onChange(name, newValue);
    }

    return (
        <StyledFormDiv>
            <h2>Design your Pizza!</h2>
            <img src={'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_960_720.jpg'} alt={'Pizza!' }/>
            <form id='pizza-form'>
                <label> Your Name
                    <input
                        name='name'
                        type='text'
                        value={values.name}
                        id='name-input'
                        onChange={change}
                    />
                </label>
                <label>
                    Size
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
                </label>

            </form>

        </StyledFormDiv>
    )
}

export default PizzaForm;