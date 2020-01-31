const {c, cpp, node, python, java} = require('compile-run')

export default async (_, args, ctx, info) => {
  const code = await ctx.prisma.query.code(
    {
      where: { id: args.code_id }
    },
    `{
      body
      exercise {
        stdin
        stdout
      }
    }`
  )

  // tu porovnam hodnoty neviem čo sptavím a ideme dalej

  const res = await cpp.runSource(
    code.body,
    { stdin: code.exercise.stdin[args.test_no]},
    (err) => { err && console.log(err) }
  )

  return {
    output: res.stdout,
    log: res.stderr || null,
    exitCode: res.exitCode,
  }
}