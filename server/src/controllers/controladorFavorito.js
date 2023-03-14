import responseHandler from "../handlers/response.js";
import modeloFavoritos from "../models/modeloFavoritos.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await modeloFavoritos.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id
    });

    await favorite.save();

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoritoId } = req.params;

    const favorite = await modeloFavoritos.findOne({
      user: req.user.id,
      _id: favoritoId
    });

    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await modeloFavoritos.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };