import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from '@/auth/dto/login.dto'
import { User } from '@/models/user.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserService } from '@/user/user.service'
import { isPasswordValid } from '@/utils'
import {
  EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
  TOKEN_EXPIRATION_TIME,
} from '@/constants'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)

    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    }

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: TOKEN_EXPIRATION_TIME,
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
          secret: process.env.JWT_REFRESH_SECRET_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    }
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email)

    if (user && isPasswordValid(dto.password, user.password)) {
      return {
        _id: user._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      }
    }
    throw new UnauthorizedException()
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.sub,
    }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }
  }
}
