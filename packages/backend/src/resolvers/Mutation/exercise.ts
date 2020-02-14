const getSlug = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')

export default async (_, args, ctx, info) => {
  const exercise = await ctx.prisma.mutation.createExercise(
    {
      data: {
        title: args.data.title,
        body: args.data.body,
        description: args.data.description,
        stdin: {
          set: args.data.stdin
        },
        stdout: {
          set: args.data.stdout
        },
        slug: getSlug(args.data.title)
      }
    },
    info
  )
  return exercise
}
