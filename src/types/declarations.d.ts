declare module 'nodemailer' {
  export interface Transporter {
    sendMail(options: {
      from: string;
      to: string;
      subject: string;
      text: string;
      html?: string;
    }): Promise<any>;
  }

  export function createTransport(options: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  }): Transporter;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
} 