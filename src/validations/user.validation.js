import * as yup from 'yup';
import prisma from '../prisma';

/**
 * Function to check if user already exists
 *
 * @param {string} value
 * @param {string} type
 *
 * @return {Promise} Promise that resolve to either error or true
 */
function userExists(value, type) {
  const { path, createError } = this;

  return new Promise((resolve, reject) => prisma.exists.User({
    [type]: value,
  }).then((exists) => {
    if (exists) {
      reject(createError({ path, message: `${type} already exists` }));
    } else {
      resolve(true);
    }
  }));
}

const userValidation = {
  createUser: yup.object().shape({
    name: yup
      .string().trim()
      .required('name is required')
      .min(2, 'name should be between 2 and 100 characters')
      .max(100, 'name should be between 2 and 100 characters'),
    email: yup
      .string().trim().lowercase()
      .required('email is required')
      .email('email address is invalid')
        .test('test-name', function (value) { // eslint-disable-line
        return userExists.call(this, value, 'email');
      }),
    username: yup
      .string().trim()
      .required('username is required')
      .min(2, 'username should be between 2 and 40 characters')
      .max(100, 'username should be between 2 and 40 characters')
      .matches(/^[0-9a-zA-Z]+$/, 'username should contain only numbers and letters')
        .test('test-name', function (value) { // eslint-disable-line
        return userExists.call(this, value, 'username');
      }),
    password: yup
      .string().trim()
      .required('password is required')
      .min(8, 'password should be more than 8 characters'),
    imageUrl: yup
      .string().trim()
      .url('url is invalid')
  })
};

export default userValidation;
