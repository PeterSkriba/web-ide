export default async (_, args, context, info) => {
  const code = await context.prisma.query.code(
    {
      where: {
        user_id: args.user_id,
        exercise_id: args.exercise_id
      }
    },
    info
  )
  return code
}