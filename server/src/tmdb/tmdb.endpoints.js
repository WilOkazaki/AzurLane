const tmdbEndpoints = {
    mediaLista: ({ mediaTipo, mediaCategoria, pagina }) => tmdbConfig.getUrl(
        `${mediaTipo}${mediaCategoria}`, pagina
    ),
    mediaDetalles: ({ mediaTipo, mediaId }) => tmdbConfig.getUrl(
        `${mediaTipo}${mediaId}`
    ),
    mediaGeneros: ({ mediaTipo }) => tmdbConfig.getUrl(
        `genero/${mediaTipo}/Lista`
    ),
    mediaCreditos: ({ mediaTipo, mediaId }) => tmdbConfig.getUrl(
        `${mediaTipo}${mediaId}/creditos`
    ),
    mediaVideos: ({ mediaTipo, mediaId }) => tmdbConfig.getUrl(
        `${mediaTipo}${mediaId}/videos`
    ),
    mediaRecomendado: ({ mediaTipo, mediaId }) => tmdbConfig.getUrl(
        `${mediaTipo}${mediaId}/recomendaciones`
    ),
    mediaImagenes: ({ mediaTipo, mediaId }) => tmdbConfig.getUrl(
        `${mediaTipo}${mediaId}/imagenes`
    ),
    mediaBusqueda: ({ mediaTipo, query, pagina }) => tmdbConfig.getUrl(
        `busqueda/${mediaTipo}`, { query, pagina }
    ),
    personaDetalle: ({ personaId }) => tmdbConfig.getUrl(
        `persona/${personaId}`
    ), 
    personaMedias: ({ personaId }) => tmdbConfig.getUrl(
        `persona/${personaId}/creditos_combinados`
    ), 
};

export default tmdbEndpoints;