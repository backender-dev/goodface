import { UUID } from '@app/common/types';
import { TABLE_NOTES } from '@app/database/tables';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(TABLE_NOTES)
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Index()
  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Index()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.notes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: UserEntity;
}
