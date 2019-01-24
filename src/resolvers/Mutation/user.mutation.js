import generateToken from '../../utils/generateToken';
import hashPassword from '../../utils/hashPassword';
import validations from '../../validations';

const { userValidation } = validations;

const usersMutation = {
  createUser: {
    validationSchema: userValidation.createUser,
    resolve: async (parents, { data }, { prisma }) => {
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
