export default async (_, args, context, info) => {
  const code = await context.db.mutation.createCode({
    data: {
      user_id: args.data.user_id,
      exercise_id: args.data.exercise_id,
      body: args.data.body,
      tests: args.data.tests
    }}, info)
  return code
}