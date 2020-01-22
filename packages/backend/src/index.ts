import { GraphQLServer, PubSub } from 'graphql-yoga'

import { Query, Mutation, Subscription } from '@/resolvers'

const pubsub = new PubSub()

const resolvers = {
  Query
}

const server = new GraphQLServer({
  typeDefs: 'src/schema/schema.graphql',
  resolvers,
  context: {
    pubsub
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