import nodemailer from 'nodemailer';
import twilio from 'twilio';
import type { Consultation } from './consultations';

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  fromEmail: string;
}

interface SMSConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

export class NotificationService {
  private static instance: NotificationService;
  private emailTransporter: nodemailer.Transporter | null = null;
  private twilioClient: twilio.Twilio | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  initializeEmail(config: EmailConfig) {
    this.emailTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: true,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  initializeSMS(config: SMSConfig) {
    this.twilioClient = twilio(config.accountSid, config.authToken);
  }

  async sendConsultationResponse(consultation: Consultation, response: string) {
    const notifications = [];

    if (consultation.email && this.emailTransporter) {
      try {
        await this.sendEmail({
          to: consultation.email,
          subject: 'Відповідь на ваш запит консультації',
          text: response
        });
        notifications.push('email');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }

    if (this.twilioClient && process.env.TWILIO_PHONE_NUMBER && consultation.phone) {
      try {
        const formattedPhone = consultation.phone.startsWith('+') 
          ? consultation.phone 
          : `+380${consultation.phone.replace(/\D/g, '')}`;

        await this.sendSMS({
          to: formattedPhone,
          message: response
        });
        notifications.push('sms');
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    }

    return notifications;
  }

  private async sendEmail(options: { to: string; subject: string; text: string }) {
    if (!this.emailTransporter) {
      throw new Error('Email service not initialized');
    }

    const info = await this.emailTransporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2563eb;">Відповідь на ваш запит</h2>
          <p style="color: #374151; line-height: 1.6;">${options.text}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 0.875rem;">
            З повагою,<br />
            Команда медичного центру
          </p>
        </div>
      `,
    });

    return info;
  }

  private async sendSMS(options: { to: string; message: string }) {
    if (!this.twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
      throw new Error('SMS service not initialized');
    }

    const result = await this.twilioClient.messages.create({
      body: options.message,
      to: options.to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return result;
  }
} 