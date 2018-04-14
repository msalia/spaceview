import Admin from '../models/Admin';
import Area from '../models/Area';
import Config from '../models/Config';
import Event from '../models/Event';
import Group from '../models/Group';
import Room from '../models/Room';

import faker from 'faker';

export default async () => {
  try {
    await Admin.remove();
    await Area.remove();
    await Config.remove();
    await Event.remove();
    await Group.remove();
    await Room.remove();

    const admin = await Admin.create({
      username: 'admin',
      password: 'password',
    });

    const area = await Area.create({name: 'Area 51'});

    const groups = await await Promise.all(
      ['Bal', 'K1'].map(async name => await Group.create({name, pin: 1234})),
    );

    const rooms = await Promise.all(
      Array.from({length: 2}).map(
        async _ =>
          await Room.create({
            area: area._id,
            location: faker.address.state(),
          }),
      ),
    );

    await Promise.all(
      ['Bal', 'K2'].map(
        async (name, index) =>
          await Config.create({
            areas: [area._id],
            createdBy: admin._id,
            group: groups[index % 2]._id,
            isActive: true,
            logo: faker.image.dataUri(),
            name,
            roomMapping: rooms.map(({_id}) => ({
              name: faker.address.county(),
              room: _id,
            })),
          }),
      ),
    );

    await Array.from({length: 4}).forEach(async (_, index) => {
      const date = Math.round(Date.now() / 1000);
      await Event.create({
        createdBy: admin._id,
        endTime: date + 60 * 60 * 1000,
        group: groups[index % 2]._id,
        name: faker.random.word(),
        room: rooms[index % 2]._id,
        startTime: date,
      });
    });
  } catch (error) {
    throw error;
  }
};
