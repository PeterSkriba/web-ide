const { c, cpp, node, python, java } = require('compile-run')

const getOut = (str: string): string => {
  const split = str.split(': ')
  const remove = split[0]
  return split
    .join(' ')
    .replace(RegExp(remove, 'g'), '')
    .replace(/ In/g, 'In')
    .replace(/\n:/g, '\n')
}

export default async (_, args, ctx, info) => {
  const code = await ctx.prisma.query.code(
    { where: { id: args.where.code_id } },
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
    { stdin: args.where.test_body },
    err => {
      err && console.log(err)
    }
  )

  code.tests[args.where.test_no] =
    res.stdout.replace(/\s/g, '') ==
    code.exercise.stdout[args.where.test_no].replace(/\s/g, '')
      ? 1
      : 2

  await ctx.prisma.mutation.updateCode(
    {
      data: { tests: { set: code.tests } },
      where: { id: args.where.code_id }
    },
    info
  )

  return {
    output: res.stdout,
    log: res.stderr ? getOut(res.stderr) : null,
    exitCode: res.exitCode
  }
}
