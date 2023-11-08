export const formatPhoneNumber = (phoneNumber) => {
    let regex, formattedNumber;

    if(!phoneNumber) return '';
    phoneNumber = phoneNumber.replace(/\W/g, '');
    phoneNumber = phoneNumber.replace(/\s/g, '');

    if(phoneNumber.length <= 2) {
        regex = /(\d{2})/;
        formattedNumber = '($1)';
    } else if(phoneNumber.length > 2 && phoneNumber.length <= 6) {
        regex = /(\d{2})(\d{4,})/;
        formattedNumber = '($1)-$2';
    } else {
        regex = /(\d{2})(\d{4})(\d{4})/;
        formattedNumber = '($1)-$2-$3';
    }
        
    return phoneNumber.replace(regex, formattedNumber);
}

export const formatCurrency = (value) => {
    return Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(value);
}