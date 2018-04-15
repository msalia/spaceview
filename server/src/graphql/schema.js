export default `
  scalar Date

  type Admin {
    _id: ID!
    password: String!
    username: String!
  }

  type Area {
    _id: ID!
    name: String!
    rooms: [Room]!
  }

  type Config {
    _id: ID!
    areas: [Area]!
    createdBy: Admin!
    group: Group!
    isActive: Boolean
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
    area: Area!
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
    getAllAreas: [Area]!
    getAllEvents: [Event]!
    getAllEventsByGroups(groupIDs: [ID]!): [Event]!
    getAllRooms: [Room]!
    getArea(areaID: ID!): Area
    getEvent(eventID: ID!): Event
    getEventsBetween(startTime: Int!, endTime: Int!): [Event]
    getEventsForRooms(roomIDs: [ID]!): [Event]!
    getRoom(roomID: ID!): Room!
    getRoomData(roomID: ID!, startTime: Int!, endTime: Int!): RoomData
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