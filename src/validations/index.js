import { ApolloError } from 'apollo-server-errors';

import userValidation from './user.validation';

const validate = async (validator, values) => {
  try {
    await validator.validate(values, { abortEarly: false });
  } catch (validationError) {
    const errorObj = validationError.inner.reduce((detailsObj, value) => {
      const field = value.path;

      if (!detailsObj[field]) {
        detailsObj[field] = {
          field, path: field, message: value.message, errors: []
        };
      }

      detailsObj[field].errors.push(value.message);

      return detailsObj;
    }, {});

    const details = Object.values(errorObj);

    throw new ApolloError(`${details.length} errors occured`, { type: 'BAD_USER_INPUT', details });
  }
};

export { userValidation };

export default validate;
