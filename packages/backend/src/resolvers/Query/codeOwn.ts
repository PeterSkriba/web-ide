export default async (_, args, context, info) => {
  const codeOwn = await context.prisma.query.codes({
    where: {
      user: {
        id: args.user_id
      },
      exercise: {
        id: args.exercise_id
      }
    }}, info)
  return codeOwn[0]
}