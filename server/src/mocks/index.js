import Room from '../models/Room';

import faker from 'faker';
import moment from 'moment';

export default async () => {
  try {
    await Room.remove();

    const rooms = await Array.from({length: 2}).forEach(async _ => {
      await Room.create({
        location: faker.name.firstName(),
      });
    });
  } catch (error) {
    throw error;
  }
};
