import React from 'react';

const ConfirmationPage = (props) => {
    const { order } = props;
    console.log(order);
    return (
        <div>
            <h2>{order}</h2>
        </div>
    )
}

export default ConfirmationPage;