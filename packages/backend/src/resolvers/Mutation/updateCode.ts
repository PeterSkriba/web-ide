export default async (_, args, context, info) => {
  const updateCode = await context.prisma.mutation.updateCode({
    data: {
      body: args.data.body
    },
    where: {
      id: args.where.id
    }
  }, info)
  return updateCode
}