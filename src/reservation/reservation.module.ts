import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schema/reservation.schema';
import { EmailService } from './email.service';
import { UserModule } from '../user/user.module';
import { ReservationRepository } from './reservation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    UserModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, EmailService, ReservationRepository],
})
export class ReservationModule {}
