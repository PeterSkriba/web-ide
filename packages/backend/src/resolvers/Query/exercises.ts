export default async (_, args, context, info) => {
  const exercises = await context.prisma.query.exercises(null, info)
  return exercises
}