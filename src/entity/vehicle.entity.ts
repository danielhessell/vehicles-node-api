import { ObjectId } from "bson";

interface VehicleProps {
  id?: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Vehicle {
  private _id: string;
  private _createdAt: Date = new Date();
  private _updatedAt: Date = new Date();

  private constructor(private props: VehicleProps) {
    this.props = props;
    this._id = props.id ?? new ObjectId().toString();
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get placa(): string {
    return this.props.placa;
  }

  get chassi(): string {
    return this.props.chassi;
  }

  get renavam(): string {
    return this.props.renavam;
  }

  get modelo(): string {
    return this.props.modelo;
  }

  get marca(): string {
    return this.props.marca;
  }

  get ano(): number {
    return this.props.ano;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(props: VehicleProps): Vehicle {
    return new Vehicle(props);
  }
}
