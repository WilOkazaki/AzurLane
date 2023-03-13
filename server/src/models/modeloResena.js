import mongoose, { Schema } from "mongoose";
import modeloOpciones from "./modeloOpciones.js";

export default mongoose.model(
  "Reseña",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    mediaType: {
      type: String,
      enum: ["tv", "pelicula"],
      required: true
    },
    mediaId: {
      type: String,
      required: true
    },
    mediaTitle: {
      type: String,
      required: true
    },
    mediaPoster: {
      type: String,
      required: true
    },
  }, modeloOpciones)
);