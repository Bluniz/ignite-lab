import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrrolment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
