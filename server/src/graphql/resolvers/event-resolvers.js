import Event from '../../models/Event';
import safetyNet from '../../utils/safetyNet';

export default {
  getEvent: async (_, { eventID }, {}) =>
    safetyNet(async () => {
      return await Event.findOne({ _id: eventID });
    }),

  getEventsBetween: async (_, { startTime, endTime }, {}) =>
    safetyNet(async () => {
      return await Event.find({
        $and: [
          { startTime: { $gte: startTime } },
          { endTime: { $lte: endTime } }
        ]
      });
    }),

  getAllEvents: async (_, {}, {}) =>
    safetyNet(async () => {
      return await Event.find({});
    }),

  getAllEventsByGroups: async (_, { groupIDs }, {}) =>
    safetyNet(async () => {
      return await Event.find({ group: { $in: groupIDs }});
    }),

  getEventsForRooms: async (_, { roomIDs }, {}) =>
    safetyNet(async () => {
      return await Event.find({ room: { $in: roomIDs }});
    })
};