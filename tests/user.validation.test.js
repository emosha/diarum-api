import 'babel-register';
import '@babel/polyfill/noConflict';
import validations from '../src/validations';
import { userOne } from './utils/seedDatabase';

const { userValidation } = validations;

test('Should be invalid when email already exists', async () => {
  const variables = {
    data: {
      name: 'Khabib',
      username: 'khabib',
      email: userOne.input.email,
      password: 'khabibib'
    }
  };
  const isValid = await userValidation.createUser.isValid(variables);

  userValidation.createUser.validate(variables).catch((err) => {
    expect(isValid).toBeFalsy();
    expect(err.errors[0]).toBe('email already exists');
  });
});

test('Should be invalid when username already exists', async () => {
  const variables = {
    data: {
      name: 'Khabib',
      username: userOne.input.username,
      email: 'khabib@test.com',
      password: 'khabibib'
    }
  };
  const isValid = await userValidation.createUser.isValid(variables);

  userValidation.createUser.validate(variables).catch((err) => {
    expect(isValid).toBeFalsy();
    expect(err.errors[0]).toBe('email already exists');
  });
});
