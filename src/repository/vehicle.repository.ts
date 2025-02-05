import { Vehicle } from "src/entity/vehicle.entity";
import { SearchInputParams, VehicleGateway } from "src/gateway/vehicle.gateway";
import { VehicleModel } from "./vehicle.model";
import { VehicleMapper } from "./vehicle.mapper";
import { handlePagination } from "src/util/handle-pagination.util";

export class VehicleRepository implements VehicleGateway {
  private repository = VehicleModel;

  async add(vehicle: Vehicle): Promise<void> {
    await this.repository.create(VehicleMapper.toPersistence(vehicle));
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.repository.findById(id);
    if (!vehicle) return null;
    return VehicleMapper.toDomain(vehicle);
  }

  async findByDocument(
    placa: string,
    chassi: string,
    renavam: string
  ): Promise<Vehicle | null> {
    const vehicle = await this.repository.findOne({
      $or: [{ placa }, { chassi }, { renavam }],
    });
    if (!vehicle) return null;
    return VehicleMapper.toDomain(vehicle);
  }

  async search(
    params: SearchInputParams
  ): Promise<{ vehicles: Vehicle[]; total: number }> {
    const { skip, take } = handlePagination(params.page, params.size);

    const query = {};
    if (params.id) query["_id"] = new RegExp(params.id, "i");
    if (params.placa) query["placa"] = new RegExp(params.placa, "i");
    if (params.chassi) query["chassi"] = new RegExp(params.chassi, "i");
    if (params.renavam) query["renavam"] = new RegExp(params.renavam, "i");
    if (params.modelo) query["modelo"] = new RegExp(params.modelo, "i");
    if (params.marca) query["marca"] = new RegExp(params.marca, "i");
    if (params.ano) query["ano"] = params.ano;

    const [vehicles, total] = await Promise.all([
      this.repository
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(take),
      this.repository.countDocuments(query),
    ]);

    return {
      vehicles: vehicles.map((vehicle) => VehicleMapper.toDomain(vehicle)),
      total,
    };
  }

  async save(vehicle: Vehicle): Promise<void> {
    await this.repository.updateOne(
      { _id: vehicle.id },
      { $set: { ...VehicleMapper.toPersistence(vehicle) } }
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.deleteOne({ _id: id });
  }
}
