import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  SetUserThemeInputDto,
  z_SetUserThemeOutputDto,
} from './dto/set-user-theme.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { z } from 'zod';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('set-user-theme')
  async setUserTheme(
    @Body() body: SetUserThemeInputDto,
    @Request() request
  ): Promise<z.infer<typeof z_SetUserThemeOutputDto>> {
    console.log(request.user);
    return this.userService.setUserTheme(body, request.user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
