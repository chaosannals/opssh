import {Entity, Column, Generated, CreateDateColumn, UpdateDateColumn, VersionColumn} from "typeorm";

// 嵌入式，相同的字段被定义成一个实体，之后嵌入到其他实体里。
@Entity()
export class Record {
    @Column()
    @Generated("uuid")
    uuid: string;
  
    @CreateDateColumn()
    createAt: string;
  
    @UpdateDateColumn()
    updateAt: string;
  
    @VersionColumn()
    version: number;
}