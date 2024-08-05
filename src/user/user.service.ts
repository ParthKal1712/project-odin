import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, z_users_username } from './entities/user.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { SetUserThemeInputDto } from './dto/set-user-theme.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return await this.userRepository.save(user);
    return 'This action adds a new user';
  }

  async setUserTheme(setUserThemeInputDto: SetUserThemeInputDto, user) {
    // const out = await this.userRepository
    //   .createQueryBuilder()
    //   .update(User)
    //   .set({ theme: setUserThemeInputDto.theme })
    //   .where('id = :id', { id: user.id })
    //   .execute();

    // console.log(setUserThemeInputDto, user);
    await this.userRepository.update(
      { id: user.id },
      { theme: setUserThemeInputDto.theme }
    );
    return {
      theme: setUserThemeInputDto.theme,
      success: true,
    };
  }

  async findUserByUsername(inputUsername: z.infer<typeof z_users_username>) {
    return this.userRepository.findOne({ where: { username: inputUsername } });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
