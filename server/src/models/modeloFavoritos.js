import mongoose, { Schema } from "mongoose";
import modeloOpciones from "./modeloOpciones.js";

export default mongoose.model(
  "Favorito",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    mediaTipo: {
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
    mediaRate: {
      type: Number,
      required: true
    },
  }, modeloOpciones)
);