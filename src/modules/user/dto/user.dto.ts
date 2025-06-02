import { ApiResponseProperty } from '@nestjs/swagger';
import { UUID } from '@app/common/types';
import { UserEntity } from '@app/modules/user/entities/user.entity';

export class UserDto
  implements Omit<UserEntity, 'createdAt' | 'password' | 'notes'>
{
  @ApiResponseProperty({ format: 'uuid' })
  id: UUID;

  @ApiResponseProperty()
  email: string;
}
