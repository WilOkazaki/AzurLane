import axiosClient from "..axios/axios.client.js"
import tmdbEndpoints from "./tmdb.endpoints.js"

const tmdbApi = {
    mediaLista: async ({ mediaTipo, mediaCategoria, pagina }) => await axiosClient.get (
        tmdbEndpoints.mediaLista({ mediaTipo, mediaCategoria, pagina })
    ),
    mediaDetalles: async ({ mediaTipo, pagina }) => await axiosClient.get (
        tmdbEndpoints.mediaDetalles({ mediaTipo, pagina })
    ),
    mediaGeneros: async ({ mediaTipo }) => await axiosClient.get (
        tmdbEndpoints.mediaGeneros({ mediaTipo })
    ),
    mediaCreditos: async ({ mediaTipo, mediaId }) => await axiosClient.get (
        tmdbEndpoints.mediaCreditos({ mediaTipo, mediaId })
    ),
    mediaVideos: async ({ mediaTipo, mediaId }) => await axiosClient.get (
        tmdbEndpoints.mediaVideos({ mediaTipo, mediaId })
    ),
    mediaImagenes: async ({ mediaTipo, mediaId }) => await axiosClient.get (
        tmdbEndpoints.mediaImagenes({ mediaTipo, mediaId })
    ),
    mediaRecomendado: async ({ mediaTipo, mediaId }) => await axiosClient.get (
        tmdbEndpoints.mediaRecomendado({ mediaTipo, mediaId })
    ),
    mediaBusqueda: async ({ mediaTipo, query, pagina }) => await axiosClient.get (
        tmdbEndpoints.mediaBusqueda({ mediaTipo, query, pagina })
    ),
    personaDetalle: async ({ personaId }) => await axiosClient.get (
        tmdbEndpoints.personaDetalle({ personaId })
    ),
    personaMedias: async ({ personaId }) => await axiosClient.get (
        tmdbEndpoints.personaMedias({ personaId })
    ),
};

export default tmdbApi;
