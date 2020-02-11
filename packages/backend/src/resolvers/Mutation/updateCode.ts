export default async (_, args, ctx, info) => {
  const updateCode = await ctx.prisma.mutation.updateCode(
    {
      data: {
        body: args.data.body
      },
      where: {
        id: args.where.id
      }
    },
    info
  )
  return updateCode
}
