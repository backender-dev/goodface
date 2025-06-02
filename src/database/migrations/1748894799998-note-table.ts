import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const TABLE_NOTES = 'note';
export class NoteTable1748894799998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NOTES,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      TABLE_NOTES,
      new TableIndex({
        name: 'IDX_note_title',
        columnNames: ['title'],
      }),
    );

    await queryRunner.createIndex(
      TABLE_NOTES,
      new TableIndex({
        name: 'IDX_note_content',
        columnNames: ['content'],
      }),
    );

    await queryRunner.createIndex(
      TABLE_NOTES,
      new TableIndex({
        name: 'IDX_note_user_id',
        columnNames: ['user_id'],
      }),
    );

    await queryRunner.createIndex(
      TABLE_NOTES,
      new TableIndex({
        name: 'IDX_note_updated_at',
        columnNames: ['updated_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NOTES, true);
  }
}
