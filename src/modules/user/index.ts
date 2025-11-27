import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

export const userService = new UserService(new UserRepository());
