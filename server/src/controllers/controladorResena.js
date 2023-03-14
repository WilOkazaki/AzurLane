import responseHandler from "../handlers/response.js";
import modeloResena from "../models/modeloResena.js";

const create = async (req, res) => {
  try {
    const { peliculaId } = req.params;

    const review = new modeloResena({
      user: req.user.id,
      peliculaId,
      ...req.body
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await modeloResena.findOne({
      _id: reviewId,
      user: req.user.id
    });

    if (!review) return responseHandler.notfound(res);

    await review.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await modeloResena.find({
      user: req.user.id
    }).sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };