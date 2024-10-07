import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '@/auth/auth.service'
import { AuthController } from '@/auth/auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserModel } from '@/models/user.model'
import { UserService } from '@/user/user.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
})
export class AuthModule {}
