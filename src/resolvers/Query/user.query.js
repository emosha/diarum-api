import getUserId from '../../utils/getUserId';

const userQuery = {
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const userExists = await prisma.exists.User({
      id: userId
    });

    if (!userExists) throw new Error('User not found');

    const user = await prisma.query.user({
      where: {
        id: userId
      },
    }, info);

    return user;
  }
};

export default userQuery;
