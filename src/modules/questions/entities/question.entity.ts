import { Form } from "src/modules/forms/entities/form.entity"
import { QuestionsType } from "src/modules/questions_types/entities/questions_type.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true })
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ default: 0 })
  required: number

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @Column()
  forms_id: number;

  @Column()
  questions_types_id: number;

  @ManyToOne(() => Form, (form) => form.id)
  @JoinColumn({ name: 'forms_id' })
  form: Form;

  @ManyToOne(() => QuestionsType, (questionsType) => questionsType.id)
  @JoinColumn({ name: 'questions_types_id' })
  questionType: QuestionsType;
}
