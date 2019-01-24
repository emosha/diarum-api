import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    username: 'jenexample',
    password: bcrypt.hashSync('Red098!@#$')
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: 'Jeff',
    email: 'jeff@example.com',
    username: 'jeffexample',
    password: bcrypt.hashSync('Red098!@#$1')
  },
  user: undefined,
  jwt: undefined
};

const seedDatabase = async () => {
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };
