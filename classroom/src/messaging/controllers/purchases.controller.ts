import { Controller, Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
@Injectable()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
  ) {}

  //! Agora esse método será chamado automaticamente sempre que houver uma nova mensagem no tópico que foi passado por parametros.
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    //! Forma de recuperar valores do kafka
    @Payload('value') payload: PurchaseCreatedPayload,
  ) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
