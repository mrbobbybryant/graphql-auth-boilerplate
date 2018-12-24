export default async (_, __, { req, res }) => {
  await new Promise(res => req.session.destroy(() => res()));
  res.clearCookie('connect.sid');
  return true;
};
