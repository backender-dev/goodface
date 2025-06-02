import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Page, PageableParams, UUID } from '@app/common/types';
import { NoteListDto } from './dto/note-list.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  private mapNotesToListDto(notes: NoteEntity[]): NoteListDto[] {
    return notes.map(({ id, title, content, user }) =>
      plainToInstance(NoteListDto, {
        id,
        title,
        content,
        user: {
          id: user.id,
          email: user.email,
        },
      }),
    );
  }

  async create(dto: CreateNoteDto, userId: UUID): Promise<void> {
    const note = this.noteRepository.create({ ...dto, user: { id: userId } });
    await this.noteRepository.save(note);
  }

  async findAll(
    pageable: PageableParams,
    userId: UUID,
  ): Promise<Page<NoteListDto>> {
    const { limit, offset } = pageable;

    const [notes, total] = await this.noteRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { updatedAt: 'DESC' },
      skip: offset,
      take: limit,
    });

    return { total, list: this.mapNotesToListDto(notes) };
  }

  async findById(id: UUID, userId: UUID): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!note) {
      throw new NotFoundException(`Note not found`);
    }

    return note;
  }

  async update(id: UUID, dto: UpdateNoteDto, userId: UUID): Promise<void> {
    const note = await this.findById(id, userId);

    const updatedNote = {
      ...note,
      ...dto,
    };

    await this.noteRepository.save(updatedNote);
  }

  async remove(id: UUID, userId: UUID): Promise<void> {
    const note = await this.findById(id, userId);

    await this.noteRepository.remove(note);
  }
}
