import { Form } from "src/modules/forms/entities/form.entity";
import { Question } from "src/modules/questions/entities/question.entity";
import { Response } from "src/modules/responses/entities/response.entity";
import { Task } from "src/modules/tasks/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks_forms')
export class TasksForm {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  tasks_id: number;

  @PrimaryColumn()
  forms_id: number;

  @Column()
  questions_id: number;

  @Column({ nullable: true })
  responses_id?: number;

  @Column({ nullable: true })
  value?: string

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @ManyToOne(() => Task, (task) => task.id)
  @JoinColumn({ name: 'tasks_id' })
  task: Task;

  @ManyToOne(() => Form, (form) => form.id)
  @JoinColumn({ name: 'forms_id' })
  form: Form;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: 'questions_id' })
  question: Question;

  @ManyToOne(() => Response, (response) => response.id)
  @JoinColumn({ name: 'responses_id' })
  response: Response;
}
