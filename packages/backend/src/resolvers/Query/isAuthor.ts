export default async (_, args, ctx, info) => {
  if (!ctx.user) return null

  const user = await ctx.prisma.query.user({
    where: {
      id: ctx.user.id
    }
  })

  return user?.isAuthor ? user : null
}
