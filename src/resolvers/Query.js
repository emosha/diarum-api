import getUserId from '../utils/getUserId';

const Query = {
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
  },
  users(parents, {
    query, first, skip, after, orderBy
  }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {}
    };

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
};

export default Query;
