import { v4 } from 'uuid';
import send from 'shared/sendgrid';
import User from 'models/users';

export default async (_, __, { user_id, redis }) => {
  const [url, user] = await Promise.all([
    buildForgotPasswordUrl(user_id, redis),
    User.getUserById(user_id),
  ]);

  await send({
    to: user.email,
    from: 'bobby@crossfield.com',
    subject: 'Reset Password Request',
    html: `<p>Someone has requested to reset your password. To complete this process click the link below.</p>
    <p>${url}</p>`,
  });

  return true;
};

const buildForgotPasswordUrl = async (userId, redis) => {
  const id = v4();
  await redis.set(`forgotPassword:${id}`, userId, 'ex', 60 * 20);
  return `${process.env.CLIENT_URL}/change-password/${id}`;
};
