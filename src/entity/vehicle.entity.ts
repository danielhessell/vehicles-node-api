import { ObjectId } from "bson";
import { DomainError } from "src/errors/domain.error";
import { validarChassi } from "src/util/validate-chassi.util";
import { validatePlaca } from "src/util/validate-plate.util";
import { validateRenavam } from "src/util/validate-renavam.util";

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
    this.validate();
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

  validate() {
    if (!validatePlaca(this.props.placa)) {
      throw new DomainError("Placa inválida");
    }

    if (!validarChassi(this.props.chassi)) {
      throw new DomainError("Chassi inválido");
    }

    if (!validateRenavam(this.props.renavam)) {
      throw new DomainError("Renavam inválido");
    }
  }

  static create(props: VehicleProps): Vehicle {
    return new Vehicle(props);
  }

  update(props: Partial<VehicleProps>) {
    if (props.placa) this.props.placa = props.placa;
    if (props.chassi) this.props.chassi = props.chassi;
    if (props.renavam) this.props.renavam = props.renavam;
    if (props.modelo) this.props.modelo = props.modelo;
    if (props.marca) this.props.marca = props.marca;
    if (props.ano) this.props.ano = props.ano;
    this._updatedAt = new Date();
  }
}
