import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDto } from 'src/auth/models/auth-register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async create(userDto: UserDto | AuthRegisterDto) {
    if (
      (await this.userRepository.findOne({
        where: { email: userDto.email },
      })) != null
    )
      throw new ConflictException('Email already exists');
    if (
      (await this.userRepository.findOne({
        where: { username: userDto.username },
      })) != null
    )
      throw new ConflictException('Username already taken');

    userDto.password = await this.hashPassword(userDto.password);

    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async update(id: number, userDto: Partial<UserDto>) {
    if (
      userDto.username &&
      (await this.userRepository.findOne({
        where: { username: userDto.username },
      })) != null
    )
      throw new ConflictException('Username already taken');
    if (userDto.password)
      userDto.password = await this.hashPassword(userDto.password);
    return this.userRepository.update(id, userDto);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOne(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 6);
  }
}
