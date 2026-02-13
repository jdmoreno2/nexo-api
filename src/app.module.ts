import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import swaggerConfig from './config/swagger.config';
import { validateEnv } from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersModule } from './modules/subscribers/subscribers.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { ClientsModule } from './modules/clients/clients.module';
import { BranchesModule } from './modules/branches/branches.module';
import { IdentificationTypeModule } from './modules/identification_type/identification_type.module';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { OrdersTypesModule } from './modules/orders_types/orders_types.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FormsModule } from './modules/forms/forms.module';
import { QuestionsTypesModule } from './modules/questions_types/questions_types.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ResponsesModule } from './modules/responses/responses.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TasksFormsModule } from './modules/tasks-forms/tasks-forms.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, swaggerConfig],
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    AuthModule,
    SubscribersModule,
    PermissionsModule,
    UsersModule,
    RolesModule,
    ClientsModule,
    BranchesModule,
    IdentificationTypeModule,
    EquipmentsModule,
    OrdersTypesModule,
    OrdersModule,
    FormsModule,
    QuestionsTypesModule,
    QuestionsModule,
    ResponsesModule,
    TasksModule,
    TasksFormsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
