
import responseHandler from "../handlers/response.js";
import jsonwebtoken from "jsonwebtoken";
import modeloUsuario from "../models/modeloUsuarios.js";


const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["unauthorize"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(
        token,
        process.env.TOKEN_SECRET
      );
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await modeloUsuario.findById(tokenDecoded.data);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode };