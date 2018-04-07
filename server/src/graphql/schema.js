export default `
  scalar Date

  type Admin {
    _id: ID!
    password: String!
    username: String!
  }

  type Config {
    _id: ID!
    createdBy: Admin!
    group: Group!
    logo: String!
    name: String!
    roomMapping: [RoomMapping]!
  }

  type Group {
    _id: ID!
    name: String!
    pin: Int!
  }

  type Room {
    _id: ID!
    location: String!
  }

  type RoomMapping {
    name: String!
    room: Room!
  }

  type Event {
    _id: ID!
    createdBy: Admin!
    endTime: Int!
    group: Group!
    name: String!
    room: Room!
    startTime: Int!
  }

  type Mutation {
    blank: String
  }

  type Query {
    getRoomData(roomID: ID!): RoomData
  }

  type RoomData {
    logo: String!
    name: String!
    events: [Event]!
  }

  type Subscription {
    blank: String
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
