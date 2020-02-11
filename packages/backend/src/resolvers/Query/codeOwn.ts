export default async (_, args, ctx, info) => {
  const queryCode = await ctx.prisma.query.codes(
    {
      first: 1,
      where: {
        user: {
          id: args.user_id
        },
        exercise: {
          slug: args.exercise_slug
        }
      }
    },
    info
  )

  if (queryCode[0]) return queryCode[0]

  const createCode = await ctx.prisma.mutation.createCode(
    {
      data: {
        user: {
          connect: { id: args.user_id }
        },
        exercise: {
          connect: { slug: args.exercise_slug }
        },
        body: '',
        tests: { set: [0, 0, 0] }
      }
    },
    info
  )

  return createCode
}
