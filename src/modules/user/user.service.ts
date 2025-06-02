import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupDto } from '../auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: SignupDto): Promise<UserEntity> {
    const { email, password } = dto;

    const existsUser = await this.findByEmail(email);
    if (existsUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const user = this.userRepository.create({
      email,
      password,
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
