import Config from '../../models/Config';
import Event from '../../models/Event';
import Room from '../../models/Room';
import safetyNet from '../../utils/safetyNet';

export default {
  getRoomData: async (_, {endTime, roomID, startTime}, {}) =>
    safetyNet(async () => {
      // Generate RoomData

      const room = await Room.findOne({
        location: {$eq: roomID}
      });

      const config = await Config.findOne({
        isActive: {$eq: true},
        area: {$eq: room.area._id}
      });
      const logo = config.logo;
      const roomName = config.roomMapping.filter(data =>
        data.room.toString() === room._id.toString())[0].name;

      const events = await Event.find({
        startTime: {$gte: startTime, $lte: endTime},
        endTime: {$gte: startTime, $lte: endTime}
      });

      return {
        events: events,
        logo: logo,
        name: roomName,
      };
    }),
};
