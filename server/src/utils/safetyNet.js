export default async callback => {
  try {
    return callback();
  } catch (error) {
    throw error;
  }
};
