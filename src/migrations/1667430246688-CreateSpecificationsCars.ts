import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpecificationsCars1667430246688
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'varchar',
          },
          {
            name: 'specification_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['car_id'],
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['specification_id'],
            referencedTableName: 'specifications',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specifications_cars');
  }
}
