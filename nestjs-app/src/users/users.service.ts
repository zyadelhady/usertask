import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = new this.userModel(createUserDto);
    try {
      const savedUser = await createdUser.save();
      return plainToClass(UserResponseDto, savedUser.toObject());
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`This Email is Used Before.`);
      } else {

    throw new Error("There was a problem!");
      }
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => plainToClass(UserResponseDto, user.toObject()));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return plainToClass(UserResponseDto, user.toObject());
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return plainToClass(UserResponseDto, existingUser.toObject());
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return true;
  }
}
