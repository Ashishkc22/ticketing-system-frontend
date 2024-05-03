const { keys, isEmpty } = require("lodash");

function validateForm({ form, setErrors, validation, errors }) {
  const validationRequired = {};
  let validationFailed = true;
  console.log("form", form);
  keys(form).forEach((key) => {
    if (validation[key]?.isRequered && !form[key]) {
      validationRequired[key] = {
        valid: true,
        message: `${key} is required.`,
      };
      validationFailed = false;
    } else {
      validationRequired[key] = {
        valid: false,
        message: "",
      };
    }
    console.log("dskjdhkfi", validation[key]?.regex?.test(form[key]));
    if (validation[key]?.regex && !validation[key].regex.test(form[key])) {
      validationRequired[key] = {
        valid: true,
        message: `enter valid ${key}.`,
      };
      validationFailed = false;
    }
  });
  setErrors(validationRequired);
  return validationFailed;
}
export default {
  validateForm,
};
