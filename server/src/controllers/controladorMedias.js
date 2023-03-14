import responseHandler from "../handlers/response.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import modeloUsuario from "../models/modeloUsuarios.js";
import modeloResena from "../models/modeloResena.js";
import tokenMiddlerware from "../middlewares/token.js";
import modeloFavoritos from "../models/modeloFavoritos.js";


const getList = async (req, res) => {
  try {
    const { pagina } = req.query;
    const { mediaTipo, mediaCategoria } = req.params;

    const response = await tmdbApi.mediaLista({ mediaTipo, mediaCategoria, pagina });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaTipo } = req.params;

    const response = await tmdbApi.mediaGeneros({ mediaTipo });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaTipo } = req.params;
    const { query, pagina } = req.query;

    const response = await tmdbApi.mediaBusqueda({
      query,pagina,
      mediaTipo: mediaTipo === "gente" ? "persona" : mediaTipo
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaTipo, mediaId } = req.params;

    const params = { mediaTipo, mediaId };

    const media = await tmdbApi.mediaDetalles(params);

    media.creditos = await tmdbApi.mediaCreditos(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recomendado = await tmdbApi.mediaRecomendado(params);

    media.recomendado = recomendado.resultados;

    media.imagenes = await tmdbApi.mediaImagenes(params);

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await modeloUsuario.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await modeloFavoritos.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await modeloResena.find({ mediaId }).populate("user").sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };