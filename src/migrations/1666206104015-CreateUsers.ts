import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1666206104015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '18',
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'driver_license',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'is_admin',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
