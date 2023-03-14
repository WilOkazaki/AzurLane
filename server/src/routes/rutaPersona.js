import express from "express";
import controladorPersona from "../controllers/controladorPersona.js";

const router = express.Router({ mergeParams: true });

router.get("/:personaId/medias", controladorPersona.personaMedias);

router.get("/:personaId", controladorPersona.personaDetalle);

export default router;