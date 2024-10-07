import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtGuard } from '@/auth/guards/jwt.guard'

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Res() res) {
    return this.usersService.findAll(res)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.usersService.findOne(+id, res)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ) {
    return this.usersService.update(+id, updateUserDto, res)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.usersService.remove(+id, res)
  }
}
