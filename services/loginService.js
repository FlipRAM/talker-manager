const createUser = (req, res, _next) => {
  const { email, password } = req.body;
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  if (email && password) return res.status(200).json({ token });
};

module.exports = {
  createUser,
};