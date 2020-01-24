export default async (_, args, context, info) => {
  const exercise = await context.prisma.query.exercise(
    {
      where: {
        title: args.title
      }
    },
    info
  )
  return exercise
}