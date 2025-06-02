import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthTokenResponseDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;
}
