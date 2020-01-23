import { GraphQLServer } from 'graphql-yoga'

import { Query, Mutation, Subscription } from '@/resolvers'

const { Prisma } = require('prisma-binding')

const resolvers = {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs: 'src/schema/schema.graphql',
  resolvers,
  context: {
    db: new Prisma({
      typeDefs: 'src/schema/schema.graphql',
      endpoint: 'http://localhost:4455',
      secret: 'secret',
      debug: true
    })
  }
})

server.start(
  {
    playground: process.env.NODE_ENV === 'production' ? false : '/'
  },
  () => {
    console.log('The server is running on http://localhost:4000')
  }
)