import mongoose from "mongoose"
import modeloOpciones from "./modeloOpciones"
import cryto from "crypto"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
      },
      salt: {
        type: String,
        required: true,
        select: false
      }
},modeloOpciones);

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
  
    this.password = crypto.pbkdf2Sync(
      password,
      this.salt,
      1000,
      64,
      "sakura512"
    ).toString("hex");
  };
  
  userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(
      password,
      this.salt,
      1000,
      64,
      "sakura512"
    ).toString("hex");
  
    return this.password === hash;
  };
  
  const modeloUsuario = mongoose.model("User", userSchema);
  
  export default modeloUsuario;

