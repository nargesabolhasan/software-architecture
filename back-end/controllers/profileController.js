exports.profile = (req, res) => {
  res.json({
    username: req.user.username,
  });
};
