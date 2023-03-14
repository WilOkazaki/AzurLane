import express from "express";
import { body } from "express-validator";
import controladorFavorito from "../controllers/controladorFavorito.js";
import controladorUsuario from "../controllers/controladorUsuario.js";
import requestHandler from "../handlers/request.js";
import modeloUsuario from "../models/modeloUsuarios.js";
import tokenMiddleware from "../middlewares/token.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists().withMessage("nombre de usuario requerido")
    .isLength({ min: 8 }).withMessage("nombre de usuario minimo 8 caracteres")
    .custom(async value => {
      const user = await modeloUsuario.findOne({ username: value });
      if (user) return Promise.reject("nombre de usuario puede ser usado");
    }),
  body("password")
    .exists().withMessage("contraseña requerida")
    .isLength({ min: 8 }).withMessage("contraseña minimo 8 caracteres"),
  body("confirmPassword")
    .exists().withMessage("confirmarContraseña requerida")
    .isLength({ min: 8 }).withMessage("confirmarContraseña minimo 8 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("confirmarContraseña incorrecto");
      return true;
    }),
  body("displayName")
    .exists().withMessage("mostrarNombre es requerido")
    .isLength({ min: 8 }).withMessage("mostrar nombre minimo 8 caractares"),
  requestHandler.validate,
  controladorUsuario.signup
);

router.post(
  "/signin",
  body("username")
    .exists().withMessage("nombre de usuario requerido")
    .isLength({ min: 8 }).withMessage("nombre de usuario minimo 8 caractares"),
  body("password")
    .exists().withMessage("contraseña requerida")
    .isLength({ min: 8 }).withMessage("contraseña minimo 8 caractares"),
  requestHandler.validate,
  controladorUsuario.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists().withMessage("contraseña requerida")
    .isLength({ min: 8 }).withMessage("contraseña minimo 8 caractares"),
  body("newPassword")
    .exists().withMessage("nueva contraseña requerida")
    .isLength({ min: 8 }).withMessage("nueva contraseña minimo 8 caractares"),
  body("confirmNewPassword")
    .exists().withMessage("confirmar nueva contraseña requerido")
    .isLength({ min: 8 }).withMessage("confirmar nueva contraseña minimo 8 caractares")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error("confirmar nueva contraseña incorrecto");
      return true;
    }),
  requestHandler.validate,
  controladorUsuario.updatePassword
);

router.get(
  "/info",
  tokenMiddleware.auth,
  controladorUsuario.getInfo
);

router.get(
  "/favoritos",
  tokenMiddleware.auth,
  controladorFavorito.getFavoritesOfUser
);

router.post(
  "/favoritos",
  tokenMiddleware.auth,
  body("mediaTipo")
    .exists().withMessage("mediaTipo is required")
    .custom(type => ["pelicula", "tv"].includes(type)).withMessage("mediaTipo invalid"),
  body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
  body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
  body("mediaRate")
    .exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  controladorFavorito.addFavorite
);

router.delete(
  "/favoritos/:favoritosId",
  tokenMiddleware.auth,
  controladorFavorito.removeFavorite
);

export default router;