import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { resolve } from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import configuration from './config/env'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './product/product.module'

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  envFilePath: [resolve(__dirname, '../.env')],
})

interface DatabaseConfig {
  DB_USER: string
  DB_PASSWORD: number
  DB_NAME: number
}

@Module({
  imports: [
    envModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<DatabaseConfig>('database')
        return {
          uri: `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@test-ecommerce.rbangce.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority&appName=test-ecommerce`,
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
