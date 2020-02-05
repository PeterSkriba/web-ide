export default async (_, args, context, info) => {
  const codeOwn = await context.prisma.query.codes({
    where: {
      user: {
        id: args.user_id
      },
      exercise: {
        slug: args.exercise_slug
      }
    }}, info)
  return codeOwn[0]
}