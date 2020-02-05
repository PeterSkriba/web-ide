const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const jwt = require('jsonwebtoken')

import { Query, Mutation, Subscription } from '@/resolvers'

const resolvers = {
  Query,
  Mutation,
  Node: {
    __resolveType() {
      return null
    }
  }
}

const getToken = (token: string) => token.replace('Bearer ', '')

const getUser = (token: string) => {
  try {
    return (token)
      ? jwt.verify(token, 'moj-akoze-sekret-kod')
      : null
  } catch (err) {
    throw new Error('Token Error')
  }
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: (req: any) => {
    const prisma = new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    })

    const tokenWithBearer = req.request.headers.authorization || ''
    const user = getUser(getToken(tokenWithBearer))

    return {
      req, //...req
      user,
      prisma
    }

  }
})

server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))