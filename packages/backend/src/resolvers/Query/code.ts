export default async (_, args, context, info) => {
  const code = await context.db.query.code(null, info)
  return code
}