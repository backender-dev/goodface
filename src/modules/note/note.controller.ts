import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoteService } from './note.service';
import { Page, PageableParams, UUID } from '@app/common/types';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Auth } from '@app/common/decorators/auth.decorator';
import { User } from '@app/common/decorators/user.decorator';
import { ApiOkResponsePaginated } from '@app/common/decorators/paged-response.decorator';
import { NoteListDto } from './dto/note-list.dto';

@ApiTags('Note')
@ApiBearerAuth()
@Controller('notes')
@Auth()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateNoteDto,
    @User('userId') userId: UUID,
  ): Promise<void> {
    return this.noteService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponsePaginated(NoteListDto)
  async findAll(
    @Query() pageable: PageableParams,
    @User('userId') userId: UUID,
  ): Promise<Page<NoteListDto>> {
    return this.noteService.findAll(pageable, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() dto: UpdateNoteDto,
    @User('userId') userId: UUID,
  ): Promise<void> {
    return this.noteService.update(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: UUID,
    @User('userId') userId: UUID,
  ): Promise<void> {
    return this.noteService.remove(id, userId);
  }
}
