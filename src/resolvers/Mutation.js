import * as bcrypt from 'bcryptjs';

import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async login(parents, { email, password }, { prisma }) {
    const errorMsg = 'Invalid email or password';
    const user = await prisma.query.user({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error(errorMsg);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error(errorMsg);
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async createUser(parents, { data }, { prisma }) {
    const password = await hashPassword(data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async updateUser(parents, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof data.password === 'string') {
      data.password = await hashPassword(data.password);
    }

    return prisma.mutation.updateUser({
      where: { id: userId },
      data
    }, info);
  },
  deleteUser(parents, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  }
};

export default Mutation;
