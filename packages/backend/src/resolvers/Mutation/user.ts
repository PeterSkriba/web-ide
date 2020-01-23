export default async (_, args, context, info) => {
  const user = await context.db.mutation.createUser({
    data: {
      username: args.data.username,
      first_name: args.data.first_name,
      last_name: args.data.last_name,
      email: args.data.email,
    }}, info)
  return user
}