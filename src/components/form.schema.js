import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Need a name for the order')
        .min(2, 'name must be at least 2 characters')
    ,
    size: yup
        .string()
        .oneOf(['small', 'medium', 'large', 'extra-large'])
    ,
    sauce: yup
        .string()
        .oneOf(['marinara', 'bbq', 'alfredo'])
    ,
    instructions: yup
        .string()
        .max(30, '30 characters max, please!')
    ,    
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    bacon: yup.boolean(),
    chicken: yup.boolean(),
    onions: yup.boolean(),
    olives: yup.boolean(),
    
})

export default formSchema;