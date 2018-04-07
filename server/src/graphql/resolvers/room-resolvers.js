import Room from '../../models/Room';

import safetyNet from '../../utils/safetyNet';

export default {
  getRoomData: async (_, {roomID}, {}) =>
    safetyNet(async () => {
      // Generate RoomData
      // return await Room.findBy({name: {$in: names}});
      return {
        logo: 'TEST',
        name: 'TEST',
        events: [],
      };
    }),
};
