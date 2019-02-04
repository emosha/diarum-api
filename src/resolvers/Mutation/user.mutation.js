import generateToken from '../../utils/generateToken';
import hashPassword from '../../utils/hashPassword';
import validation, { userValidation } from '../../validations';

const { createUser } = userValidation;

const usersMutation = {
  createUser: {
    resolve: async (parents, { data }, { prisma }) => {
      await validation(createUser, data);

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
    }
  }
};

export default usersMutation;
