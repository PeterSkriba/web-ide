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
  const res = await cpp.runSource(
    args.data.body,
    { stdin: args.data.input },
    err => {
      err && console.log(err)
    }
  )

  return {
    output: res.stdout,
    log: res.stderr ? getOut(res.stderr) : null,
    exitCode: res.exitCode
  }
}
