import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1629142923098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        role enum('user','admin') NOT NULL DEFAULT 'user',
        id int(11) NOT NULL AUTO_INCREMENT,
        is_active enum('Active', 'Disabled') NOT NULL DEFAULT 'Active',
        subscription enum('Subscribed','Unsubscribed') NOT NULL DEFAULT 'Subscribed',
        PRIMARY KEY (id),
        UNIQUE (email)
      );
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
