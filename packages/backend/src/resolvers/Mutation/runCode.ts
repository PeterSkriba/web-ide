const {c, cpp, node, python, java} = require('compile-run')

export default async (_, args, ctx, info) => {
  const code = await ctx.prisma.query.code(
    { where: { id: args.code_id } },
    `{
      body
      tests
      exercise {
        stdin
        stdout
      }
    }`
  )

  const res = await cpp.runSource(
    code.body,
    { stdin: args.test_body},
    (err) => { err && console.log(err) }
  )

  code.tests[args.test_no] = (res.stdout.replace(/\s/g, '') == code.exercise.stdout[args.test_no].replace(/\s/g, '')) ? 1 : 2
  await ctx.prisma.mutation.updateCode({
    data: { tests: {set: code.tests} },
    where: { id: args.code_id }
  }, info)

  return {
    output: res.stdout,
    log: res.stderr || null,
    exitCode: res.exitCode,
  }
}