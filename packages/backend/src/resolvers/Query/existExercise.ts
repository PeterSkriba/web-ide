export default async (_, args, ctx, info) => {
  const existExercise = await ctx.prisma.query.exercise({
    where: {
      title: args.title
    }
  })
  return !!existExercise
}
