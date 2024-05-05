

const getALlPostsControllers = async (req, res) => {
  console.log(req._id);
  return res.send("These are all posts");
};

module.exports = { getALlPostsControllers };
