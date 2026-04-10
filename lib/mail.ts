import nodemailer from 'nodemailer';
import { IBooking } from '@/models/Booking';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER?.replace(/"/g, '').replace(/'/g, ''),
    pass: process.env.SMTP_PASS?.replace(/"/g, '').replace(/'/g, ''),
  },
});

export const sendBookingConfirmation = async (booking: IBooking) => {
  // Check if SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured. Email not sent.');
    return;
  }

  const { customerName, email, serviceType, preferredDate } = booking;
  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Care Plus Auto Repairing" <noreply@careplus.com>',
    to: email,
    subject: `Booking Confirmed: ${serviceType} - Care Plus Auto Repairing`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
          <div style="background-color: #D70006; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Care Plus</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Auto Repairing & Maintenance</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${customerName},</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Great news! Your booking request for <strong>${serviceType}</strong> has been <strong>confirmed</strong>.
            </p>
            <div style="background-color: #f9f9f9; border-left: 4px solid #D70006; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #333;"><strong>Service:</strong> ${serviceType}</p>
              <p style="margin: 5px 0 0; color: #333;"><strong>Date:</strong> ${formattedDate}</p>
              ${booking.preferredTime ? `<p style="margin: 5px 0 0; color: #333;"><strong>Time:</strong> ${booking.preferredTime}</p>` : ''}
            </div>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Our team of expert mechanics is ready to provide top-notch care for your vehicle. If you have any questions or need to reschedule, please contact us immediately.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="tel:+971528031110" style="background-color: #D70006; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; text-transform: uppercase;">Call Us: +971 52 803 1110</a>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 0;">9 19d Street - 3 St - Al Qouz Ind. 3 - Dubai - UAE</p>
            <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Care Plus Auto Repairing. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to: ${email}`);
  } catch (error) {
    console.error(' Failed to send confirmation email:', error);
  }
};
export const sendBookingCancellation = async (booking: IBooking) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured. Email not sent.');
    return;
  }

  const { customerName, email, serviceType, preferredDate } = booking;
  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Care Plus Auto Repairing" <noreply@careplus.com>',
    to: email,
    subject: `Booking Cancelled: ${serviceType} - Care Plus Auto Repairing`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
          <div style="background-color: #333; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Care Plus</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Auto Repairing & Maintenance</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${customerName},</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              We are writing to inform you that your booking for <strong>${serviceType}</strong> on <strong>${formattedDate}</strong> has been <strong>cancelled</strong>.
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              If you did not request this cancellation or would like to reschedule, please contact us immediately so we can assist you.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="tel:+971528031110" style="background-color: #D70006; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; text-transform: uppercase;">Call Us: +971 52 803 1110</a>
            </div>
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px; text-align: center;">
              We apologize for any inconvenience this may have caused.
            </p>
          </div>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 0;">9 19d Street - 3 St - Al Qouz Ind. 3 - Dubai - UAE</p>
            <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Care Plus Auto Repairing. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to: ${email}`);
  } catch (error) {
    console.error('Failed to send cancellation email:', error);
  }
};

export const sendBookingCompletion = async (booking: IBooking) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured. Email not sent.');
    return;
  }

  const { customerName, email, serviceType } = booking;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Care Plus Auto Repairing" <noreply@careplus.com>',
    to: email,
    subject: `Service Completed: ${serviceType} - Care Plus Auto Repairing`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
          <div style="background-color: #D70006; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Care Plus</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Auto Repairing & Maintenance</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${customerName},</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              We are pleased to inform you that the service for your vehicle (<strong>${serviceType}</strong>) has been <strong>successfully completed</strong>!
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              We hope you are satisfied with our work. Our priority is to keep your vehicle running smoothly and safely on the road.
            </p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 25px 0; text-align: center;">
              <h3 style="margin: 0; color: #333; font-size: 18px;">How was your experience?</h3>
              <p style="color: #666; margin: 10px 0 20px;">Your feedback helps us provide even better service.</p>
              <div style="display: flex; justify-content: center; gap: 10px;">
                <a href="https://g.page/r/your-google-review-link" style="background-color: #333; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 14px;">Leave a Google Review</a>
              </div>
            </div>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Thank you for choosing <strong>Care Plus Auto Repairing</strong>. We look forward to serving you again!
            </p>
          </div>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 0;">9 19d Street - 3 St - Al Qouz Ind. 3 - Dubai - UAE</p>
            <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Care Plus Auto Repairing. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Completion email sent to: ${email}`);
  } catch (error) {
    console.error('Failed to send completion email:', error);
  }
};
