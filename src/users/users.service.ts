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

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
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

    const hashedPassword = await bcrypt.hash(userDto.password, 6);
    userDto.password = hashedPassword;

    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async update(id: number, userDto: UserDto) {
    return this.userRepository.update(id, userDto);
  }

  async findOne(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
