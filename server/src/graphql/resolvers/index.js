import Admin from '../../models/Admin';
import Area from '../../models/Area';
import AreaResolvers from './area-resolvers';
import Constants from '../../config/constants';
import GraphQLDate from 'graphql-date';
import Group from '../../models/Group';
import Room from '../../models/Room';
import RoomResolvers from './room-resolvers';

export default {
  Area: {
    rooms: ({_id}) => Room.find({area: {$in: _id}}),
  },
  Config: {
    areas: ({areas}) => Area.find({_id: {$in: areas}}),
    createdBy: ({createdBy}) => Admin.findById(createdBy),
    group: ({group}) => Group.findById(group),
  },
  Event: {
    createdBy: ({createdBy}) => Admin.findById(createdBy),
    group: ({group}) => Group.findById(group),
  },
  Query: {
    getAllAreas: AreaResolvers.getAllAreas,
    getArea: AreaResolvers.getArea,
    getRoomData: RoomResolvers.getRoomData,
  },
  Mutation: {
    blank: _ => '',
  },
  Subscription: {
    blank: _ => '',
  },
};
