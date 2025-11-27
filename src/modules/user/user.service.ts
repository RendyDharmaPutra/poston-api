import { HttpError } from "../../common/exception/http_error";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./user.schema";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async findOrCreate(telegramId: string) {
    try {
      const user = await this.userRepository.findByTelegramId(telegramId);

      if (!user) return this.userRepository.create({ telegramId });

      return user;
    } catch (error) {
      // ? Error Logging
      console.log("User Service: findOrCreate error", JSON.stringify(error));

      throw new HttpError("Gagal membuat atau menemukan pengguna");
    }
  }
}
