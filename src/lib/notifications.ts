import nodemailer from 'nodemailer';
import type { Consultation } from './client/consultationManager';

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  fromEmail: string;
}

export class NotificationService {
  private static instance: NotificationService;
  private emailTransporter: nodemailer.Transporter | null = null;

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
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
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

    return notifications;
  }

  private async sendEmail(options: { to: string; subject: string; text: string }) {
    if (!this.emailTransporter) {
      throw new Error('Email service not initialized');
    }

    const info = await this.emailTransporter.sendMail({
      from: process.env.SMTP_FROM,
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
} 