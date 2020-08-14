export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required && isValid) {
        isValid = value.trim() !== '';
    }

    if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }


    if (rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
    }

    if (rules.requiresNum && isValid) {
        isValid = /[1234567890]/g.test(value);
    }

    if (rules.requiresSpecialChar && isValid) {
        isValid = /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(value);
    }

    if (rules.isEmail && isValid) {
        isValid = /@/g.test(value);
    }

    return isValid;
}