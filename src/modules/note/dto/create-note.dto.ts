import { ApiProperty } from '@nestjs/swagger';
import { NoteEntity } from '../entities/note.entity';
import { IsString, MaxLength } from 'class-validator';

export class CreateNoteDto
  implements Omit<NoteEntity, 'id' | 'createdAt' | 'updatedAt' | 'user'>
{
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  content: string;
}
