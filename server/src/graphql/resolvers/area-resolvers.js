import Area from '../../models/Area';

import safetyNet from '../../utils/safetyNet';

export default {
  getAllAreas: async (_, {}, {}) =>
    safetyNet(async () => {
      return await Area.find({});
    }),
  getArea: async (_, {areaID}, {}) =>
    safetyNet(async () => {
      return await Area.findById(areaID);
    }),
};
