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
})

export default formSchema;