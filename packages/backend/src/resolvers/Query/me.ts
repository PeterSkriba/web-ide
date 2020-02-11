export default async (_, args, ctx, info) => {
  if (!ctx.user) return null

  const me = await ctx.prisma.query.user(
    {
      where: {
        id: ctx.user.id
      }
    },
    info
  )

  return me
}
