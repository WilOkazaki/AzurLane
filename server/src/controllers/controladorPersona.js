import responseHandler from "../handlers/response.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personaDetalle = async (req, res) => {
  try {
    const { personaId } = req.params;
    const person = await tmdbApi.personaDetalle({ personaId });
    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const personaMedias = async (req, res) => {
  try {
    const { personaId } = req.params;
    const medias = await tmdbApi.personaMedias({ personaId });
    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default { personaDetalle, personaMedias };