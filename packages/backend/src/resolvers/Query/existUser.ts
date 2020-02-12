export default async (_, args, ctx, info) => {
  const existUser = await ctx.prisma.query.user({
    where: {
      email: args.email
    }
  })
  return !!existUser
}
