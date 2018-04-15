import Admin from "../../models/Admin";
import Area from "../../models/Area";
import AreaResolvers from "./area-resolvers";
import Constants from "../../config/constants";
import EventResolvers from "./event-resolvers";
import GraphQLDate from "graphql-date";
import Group from "../../models/Group";
import Room from "../../models/Room";
import RoomResolvers from "./room-resolvers";

export default {
  Area: {
    rooms: ({ _id }) => Room.find({ area: { $in: _id } })
  },
  Config: {
    areas: ({ areas }) => Area.find({ _id: { $in: areas } }),
    createdBy: ({ createdBy }) => Admin.findById(createdBy),
    group: ({ group }) => Group.findById(group)
  },
  Event: {
    createdBy: ({ createdBy }) => Admin.findById(createdBy),
    group: ({ group }) => Group.findById(group)
  },
  Room: {
    area: ({ area }) => Area.findById(area)
  },
  Query: {
    getAllAreas: AreaResolvers.getAllAreas,
    getAllEvents: EventResolvers.getAllEvents,
    getAllEventsByGroups: EventResolvers.getAllEventsByGroups,
    getAllRooms: RoomResolvers.getAllRooms,
    getArea: AreaResolvers.getArea,
    getEvent: EventResolvers.getEvent,
    getEventsBetween: EventResolvers.getEventsBetween,
    getEventsForRooms: EventResolvers.getEventsForRooms,
    getRoom: RoomResolvers.getRoom,
    getRoomData: RoomResolvers.getRoomData
  },
  Mutation: {
    blank: _ => ''
  },
  Subscription: {
    blank: _ => ''
  }
};
