import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    sku: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    brand: string;

    @Column({ nullable: false })
    model: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    color: string;

    @Column({ type: 'decimal', nullable: true })
    price: number;

    @Column({ nullable: true })
    currency: string;

    @Column({ nullable: true })
    stock: number;

    @Column({ default: false })
    deleted: boolean;

}