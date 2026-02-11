import { Question } from "src/modules/questions/entities/question.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @Column()
  questions_id: number;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: 'questions_id' })
  question: Question;
}
