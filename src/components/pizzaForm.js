import React from "react";
import styled from 'styled-components';

const StyledFormDiv = styled.div`
    background-color: gray;
`

const PizzaForm = (props) => {

    return (
        <StyledFormDiv>
            <h2>Design your Pizza!</h2>
        </StyledFormDiv>
    )
}

export default PizzaForm;