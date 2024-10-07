import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { LoginDto } from '@/auth/dto/login.dto'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { UserService } from '@/user/user.service'
import { RefreshJwtGuard } from '@/auth/guards/refresh.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('registration')
  async registration(@Body() registrationDto: CreateUserDto) {
    return await this.userService.create(registrationDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user)
  }
}
