export default async (_, args, context, info) => {
  const createUser = await context.prisma.mutation.createUser({
    data: {
      username: args.data.username,
      email: args.data.email,
    }}, info)
  return createUser
}