const bcrypt = require('bcryptjs')

export default async (_, args, ctx, info) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(args.data.password, salt)
  const user = await ctx.prisma.mutation.createUser({
    data: {
      username: args.data.username,
      first_name: args.data.first_name,
      last_name: args.data.last_name,
      email: args.data.email,
      password: hashedPassword
    }}, info)
  return user
}