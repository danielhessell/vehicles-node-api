import mongoose, { Schema } from "mongoose";

export interface VehicleModelInterface extends Document {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  createdAt: Date;
  updatedAt: Date;
}

export const VehicleModel = mongoose.model(
  "Vehicle",
  new Schema<VehicleModelInterface>(
    {
      placa: { type: String, required: true, unique: true },
      chassi: { type: String, required: true, unique: true },
      renavam: { type: String, required: true, unique: true },
      modelo: { type: String, required: true },
      marca: { type: String, required: true },
      ano: { type: Number, required: true },
      createdAt: { type: Date, required: true },
      updatedAt: { type: Date, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
      id: true,
    }
  )
);
