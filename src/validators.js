export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
}

export const validateRegisterForm = (values) => {
    const errors = [];
    if (!values.firstName) {
        errors.push('- Por favor ingrese su nombre');
    }
    if (!values.lastName) {
        errors.push('- Por favor ingrese su apellido');
    }
    if(!values.phoneNumber) {
        errors.push('- Por favor ingrese su numero de telefono');
    }
    if(values.phoneNumber.length !== 10) {
        errors.push('- Su numero de telefono debe tener 10 digitos');
    }
    if (!values.password) {
        errors.push('- Complete el campo de contraseña');
    }
    if (values.password !== values.confirmPassword) {
        errors.push('- Las contraseñas no coinciden');
    }
    if(values.password.length < 8) {
        errors.push('- La contraseña debe tener al menos 8 caracteres');
    }
    if (!values.email) {
        errors.push('- Por favor ingrese su correo electronico');
    }
    return errors;
}