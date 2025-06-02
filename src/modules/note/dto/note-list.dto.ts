import { ApiResponseProperty } from '@nestjs/swagger';
import { UUID } from '@app/common/types';
import { UserDto } from '@app/modules/user/dto/user.dto';

export class NoteListDto {
  @ApiResponseProperty({ format: 'uuid' })
  id: UUID;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty()
  user: UserDto;
}
