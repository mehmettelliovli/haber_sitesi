import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ReservationService } from './reservation.service';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly reservation: ReservationService) {
    this.transporter = nodemailer.createTransport({
      host: 'mail.yatdosemetamiri.com.tr',
      port: 587,
      secure: false,
      auth: {
        user: 'mehmet@yatdosemetamiri.com.tr',
        pass: 'Z28d^3ae',
      },
    });
  }

  async sendEmail(to: string, subject: string, reservationId: string) {
    const mailOptions = {
      from: 'mehmet@yatdosemetamiri.com.tr',
      to: to, //buraya kullanici maili gelecek
      subject: subject,
      html: `
      <h1>Reservation Updated</h1>
      <p>Your reservation has been updated successfully.</p>
      <p>Here are the details of your reservation:</p>
      <ul>
        <li><b>Start Date: ${(await this.reservation.getReservation(reservationId)).payload.startDate}</b></li>
        <li><b>End Date: ${(await this.reservation.getReservation(reservationId)).payload.endDate}</b></li>
        <li><b>Party Size: ${(await this.reservation.getReservation(reservationId)).payload.partySize}</b></li>
      </ul>
      <p>Thank you for choosing our service!</p>
    `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
