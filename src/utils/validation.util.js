const { keys, isEmpty } = require("lodash");

function validateForm({ form, setErrors, validation, errors }) {
  const validationRequired = {};
  console.log("form", form);
  keys(form).forEach((key) => {
    if (validation[key]?.isRequered && !form[key]) {
      validationRequired[key] = {
        valid: true,
        message: `${key} is required.`,
      };
    } else {
      validationRequired[key] = {
        valid: false,
        message: "",
      };
    }
    if (validation[key]?.regex && !validation[key].regex.test(form[key])) {
      validationRequired[key] = {
        valid: true,
        message: `enter valid ${key}.`,
      };
    }
  });
  setErrors(validationRequired);
  return !isEmpty(validationRequired);
}
export default {
  validateForm,
};
