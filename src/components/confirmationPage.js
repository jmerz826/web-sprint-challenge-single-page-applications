import React from 'react';
import styled from 'styled-components';

const StyledConfimationMessage = styled.div`
    background-color: greenyellow;
    display:flex;
    flex-direction:column;
    align-items:center;
`

const ConfirmationPage = (props) => {
    const { order } = props;
    console.log(order);
    return (
        <StyledConfimationMessage>
            <h2>🍕🍕🍕 Your order has been placed! 🍕🍕🍕</h2>
            <h3>Your Name: {order[0].name}</h3>
            <h3>Order: 1 {order[0].size} pizza with {order[0].sauce} sauce</h3>
            <h3>Topping(s): 
                {order[0].pepperoni || order[0].sausage || order[0].olives || order[0].onions || order[0].chicken || order[0].bacon ? '' : ' none'}
                {order[0].pepperoni ? 'Pepperoni ' : ''}
                {order[0].sausage ? 'Sausage ' : ''}
                {order[0].bacon ? 'Bacon ' : ''}
                {order[0].onions ? 'Red Onions ' : ''}
                {order[0].olives ? 'Black Olives ' : ''}
                {order[0].chicken ? 'Grilled Chicken ' : ''}
            </h3>
            <h3>Special instructions: {order[0].instructions }</h3>

        </StyledConfimationMessage>
    )
}

export default ConfirmationPage;