export default async (_, args, context, info) => {
  const createUser = await context.prisma.mutation.createUser({
    data: {
      username: args.data.username,
      first_name: args.data.first_name,
      last_name: args.data.last_name,
      email: args.data.email,
      password: args.data.password
    }}, info)
  return createUser
}