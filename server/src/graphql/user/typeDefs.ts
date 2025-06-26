export const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: String!
    name: String!
    email: String!
  }

  type Event {
    id: String!
    name: String!
    location: String!
    startTime: DateTime!
    attendees: [User!]!
  }

  type Query {
    event(id: ID!): Event
    events: [Event!]!
    me: User
  }

  type Mutation {
    joinEvent(eventId: String!): Event
    leaveEvent(eventId: String!): Event
  }
`