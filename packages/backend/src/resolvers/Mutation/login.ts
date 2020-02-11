const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

export default async (_, args, ctx, info) => {
  const user = await ctx.prisma.query.user({
    where: { email: args.email }
  })

  if (!user) throw new Error('Invalid Email')

  const passwordMatch = await bcrypt.compare(args.password, user.password)

  if (!passwordMatch) throw new Error('Invalid Password')

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.SECRET,
    {
      expiresIn: '30d'
    }
  )

  return { token, user }
}
