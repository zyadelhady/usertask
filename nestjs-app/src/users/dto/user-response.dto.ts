import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  age: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
