export default async (_, args, context, info) => {
  const exercise = await context.db.query.exercise(null, info)
  return exercise
}