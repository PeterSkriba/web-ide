export default async (_, args, context, info) => {
  const user = await context.prisma.query.user(
    {
      where: {
        email: args.email
      }
    },
    info
  )
  return user
}