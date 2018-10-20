const Joi = require("joi");

function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function(a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
}

function postBodyParser(body, records) {
  const schema = {
    last_name: Joi.string()
      .min(3)
      .required(),
    first_name: Joi.string()
      .min(3)
      .required(),
    gender: Joi.string().required(),
    favorite_color: Joi.string()
      .min(3)
      .required(),
    date_of_birth: Joi.string().required()
  };
  const result = Joi.validate(body, schema);

  if (result.error) {
    return { error: result.error.details[0].message };
  }

  const record = {
    id: records.length + 1,
    last_name: body.last_name,
    first_name: body.first_name,
    gender: body.gender,
    favorite_color: body.favorite_color,
    date_of_birth: body.date_of_birth
  };
  return { record: record };
}

module.exports = { dynamicSort, postBodyParser };
