import Admin from '../models/Admin';
import Config from '../models/Config';
import Event from '../models/Event';
import Group from '../models/Group';
import Room from '../models/Room';

import faker from 'faker';

export default async () => {
  try {
    await Admin.remove();
    await Config.remove();
    await Event.remove();
    await Group.remove();
    await Room.remove();

    const admin = await Admin.create({
      username: 'admin',
      password: 'password',
    });

    const groups = await await Promise.all(
      ['Bal', 'Kishore'].map(
        async name => await Group.create({name, pin: 1234}),
      ),
    );

    const rooms = await Promise.all(
      Array.from({length: 2}).map(
        async _ => await Room.create({location: faker.name.firstName()}),
      ),
    );

    await Array.from({length: 4}).forEach(async (_, index) => {
      const date = Date.now() / 1000;
      await Event.create({
        createdBy: admin._id,
        endTime: date,
        group: groups[index % 2]._id,
        name: faker.name.firstName(),
        room: rooms[index % 2]._id,
        startTime: date + 60 * 60 * 1000,
      });
    });
  } catch (error) {
    throw error;
  }
};
