export default async (_, args, context, info) => {
  const exercise = await context.db.mutation.createExercise({
    data: {
      title: args.data.title,
      description: args.data.description,
      stdin: args.data.stdin,
      stdout: args.data.stdout
    }}, info)
  return exercise
}