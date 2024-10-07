import { ConflictException, Injectable } from '@nestjs/common'
import { User } from '../models/user.model'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { hashPassword } from '../utils'
import { IUser } from '../interfaces'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async findAll(res) {
    try {
      const result = await this.UserModel.find()
      return res.json(result ? result : [])
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal server error - ${(error as Error).message}` })
    }
  }

  async findOne(id: number, res) {
    try {
      const result = await this.UserModel.findOne({ _id: id })
      return res.json(result)
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal server error - ${(error as Error).message}` })
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, res) {
    const existingUser = await this.UserModel.find({ _id: id })

    if (!existingUser?.length) {
      return res.status(409).json({ error: 'User was not found' })
    }

    try {
      const result = await this.UserModel.findByIdAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      )

      return res.json({ user: result })
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal server error - ${(error as Error).message}` })
    }
  }

  async remove(id: number, res) {
    const existingUser = await this.UserModel.find({ _id: id })

    if (!existingUser?.length) {
      console.log('Error - User was not found')
      return res.status(409).json({ error: 'User was not found' })
    }

    try {
      await this.UserModel.findOneAndDelete({ _id: id })
      return res.status(200).send({
        message: `User with email '${existingUser[0]?.email}' deleted successfully`,
      })
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal server error - ${(error as Error).message}` })
    }
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({ email })
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, role } = createUserDto

    const existingUserWithEmail = await this.findByEmail(email)

    if (existingUserWithEmail) {
      throw new ConflictException(
        `User with email '${email}' is already exists`,
      )
    }

    const hashedPassword = await hashPassword(password)

    const userData: Partial<IUser> = {
      email,
      name,
      password: hashedPassword,
    }

    if (role) userData.role = role

    return await this.UserModel.create(userData)
  }
}
