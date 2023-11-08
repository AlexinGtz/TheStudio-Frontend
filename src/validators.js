export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
}

export const validateRegisterForm = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Name is required';
    }
    if (!values.lastName) {
        errors.lastName = 'Last Name is required';
    }
    if(!values.phoneNumber) {
        errors.phoneNumber = 'Phone Number is required';
    }
    if(values.phoneNumber.length !== 10) {
        errors.phoneNumber = 'Phone Number must be 10 digits';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }
    return errors;
}