import express from "express";
import controladorMedia from "../controllers/controladorMedias.js";

const router = express.Router({ mergeParams: true });

router.get("/search", controladorMedia.search);

router.get("/genres", controladorMedia.getGenres);

router.get("/detail/:mediaId", controladorMedia.getDetail);

router.get("/:mediaCategory", controladorMedia.getList);

export default router;