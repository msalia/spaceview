import Constants from '../../config/constants';
import GraphQLDate from 'graphql-date';
import RoomResolvers from './room-resolvers';

export default {
  Query: {
    getRoomData: RoomResolvers.getRoomData,
  },
  Mutation: {
    blank: _ => '',
  },
  Subscription: {
    blank: _ => '',
  },
};
