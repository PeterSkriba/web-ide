export default async (_, args, context, info) => {
  const exercise = await context.prisma.query.exercise(
    {
      where: {
        slug: args.slug
      }
    },
    info
  )
  return exercise
}