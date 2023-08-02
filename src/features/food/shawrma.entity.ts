import { Entity, PrimaryGeneratedColumn, RelationId, ManyToOne } from "typeorm";

@Entity()
export default class Shawrma {
    @Column({nullable: true,type: "timestamptz"})
    deletedAt?: Date;
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @Column({nullable: true,type: "varchar",length: "255"})
    kind?: string;
    @UpdateDateColumn()
    updatedAt?: Date;
}
