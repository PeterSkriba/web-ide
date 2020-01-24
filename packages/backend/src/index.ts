const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

import { Query, Mutation, Subscription } from '@/resolvers'

const resolvers = {
  Query,
  Mutation,
  Node: {
    __resolveType() {
      return null;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    })
  })
})

server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))