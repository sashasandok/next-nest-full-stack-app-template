import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({ default: 'user' })
  role: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const UserModel = SchemaFactory.createForClass(User)
