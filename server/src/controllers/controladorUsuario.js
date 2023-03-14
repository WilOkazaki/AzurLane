import modeloUsuario from "../models/modeloUsuarios.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const checkUser = await modeloUsuario.findOne({ username });
        
        if (checkUser) return responseHandler.badrequest(res, "nombre de usuario ya utilizado");
    
    const user = new modeloUsuario();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await modeloUsuario.findOne({ username }).select("mostrar id del usuario");

        if (!user) return responseHandler.badrequest(res, "Usuario no existe");

        if (!user.validPassword(password)) return responseHandler.badrequest(res, "Contraseña inconrrecta");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await modeloUsuario.findById(req.user.id).select("contraseña id");

        if (!user) return responseHandler.unauthorize(res);

        if (!user.validPassword(password)) return responseHandler.badrequest(res, "contraseña incorrecta");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await modeloUsuario.findById(req.user.id);

        if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup, signin, getInfo, updatePassword
};