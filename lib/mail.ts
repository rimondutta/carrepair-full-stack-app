import nodemailer from 'nodemailer';
import { IBooking } from '@/models/Booking';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER?.replace(/"/g, '').replace(/'/g, ''),
    pass: process.env.SMTP_PASS?.replace(/"/g, '').replace(/'/g, ''),
  },
  // Add connection timeout for better reliability in serverless
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify connection configuration on startup (in dev)
if (process.env.NODE_ENV === 'development') {
  transporter.verify((error) => {
    if (error) {
      logger.error('[SMTP Connection Error]', error);
    } else {
      logger.log('[SMTP] Server is ready to take our messages');
    }
  });
}

/**
 * Responsive Email Layout Wrapper
 */
const getEmailLayout = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      .inner-padding { padding: 20px !important; }
      .mobile-full { width: 100% !important; display: block !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <div style="padding: 20px 10px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #dddddd;">
      <!-- Header -->
      <div style="background-color: #EB0005; padding: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 24px;">Abdur Rehman</h1>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Auto AC Electrical & Mechanical Repairing Garage</p>
      </div>
      
      <!-- Body -->
      <div class="inner-padding" style="padding: 35px; line-height: 1.6; color: #333333;">
        ${content}
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9f9f9; padding: 20px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee;">
        <p style="margin: 0;">24B Street - Al Qouz Ind.first - Al Quoz - Dubai - UAE</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Abdur Rehman Auto Garage. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const sendBookingConfirmation = async (booking: IBooking) => {
  // Check if SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    logger.warn('SMTP credentials not configured. Email not sent.');
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
    from: process.env.SMTP_FROM || '"Abdur Rehman Auto Garage" <noreply@abdurrehman.com>',
    to: email,
    subject: `Booking Confirmed: ${serviceType} - Abdur Rehman Auto Garage`,
    html: getEmailLayout(`
      <h2 style="color: #333; margin-top: 0; font-size: 20px;">Hello ${customerName},</h2>
      <p style="color: #666; font-size: 16px;">
        Great news! Your booking request for <strong>${serviceType}</strong> has been <strong>confirmed</strong>.
      </p>
      <div style="background-color: #f9f9f9; border-left: 4px solid #EB0005; padding: 15px; margin: 25px 0;">
        <p style="margin: 0; color: #333;"><strong>Service:</strong> ${serviceType}</p>
        <p style="margin: 5px 0 0; color: #333;"><strong>Date:</strong> ${formattedDate}</p>
        ${booking.preferredTime ? `<p style="margin: 5px 0 0; color: #333;"><strong>Time:</strong> ${booking.preferredTime}</p>` : ''}
      </div>
      <p style="color: #666; font-size: 16px;">
        Our team of expert mechanics is ready to provide top-notch care for your vehicle. If you have any questions or need to reschedule, please contact us immediately.
      </p>
      <div style="text-align: center; margin-top: 35px;">
        <a href="tel:+971567253107" class="mobile-full" style="background-color: #EB0005; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 6px; text-transform: uppercase; font-size: 14px; display: inline-block;">Call Us: +971 56 725 3107</a>
      </div>
    `),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.log(`Confirmation email sent to: ${email}`);
  } catch (error) {
    logger.error(' Failed to send confirmation email:', error);
  }
};
export const sendBookingCancellation = async (booking: IBooking) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    logger.warn('SMTP credentials not configured. Email not sent.');
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
    from: process.env.SMTP_FROM || '"Abdur Rehman Auto Garage" <noreply@abdurrehman.com>',
    to: email,
    subject: `Booking Cancelled: ${serviceType} - Abdur Rehman Auto Garage`,
    html: getEmailLayout(`
      <h2 style="color: #333; margin-top: 0; font-size: 20px;">Hello ${customerName},</h2>
      <p style="color: #666; font-size: 16px;">
        We are writing to inform you that your booking for <strong>${serviceType}</strong> on <strong>${formattedDate}</strong> has been <strong>cancelled</strong>.
      </p>
      <p style="color: #666; font-size: 16px;">
        If you did not request this cancellation or would like to reschedule, please contact us immediately so we can assist you.
      </p>
      <div style="text-align: center; margin-top: 35px;">
        <a href="tel:+971567253107" class="mobile-full" style="background-color: #EB0005; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 6px; text-transform: uppercase; font-size: 14px; display: inline-block;">Call Us: +971 56 725 3107</a>
      </div>
      <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center; font-style: italic;">
        We apologize for any inconvenience this may have caused.
      </p>
    `),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.log(`Cancellation email sent to: ${email}`);
  } catch (error) {
    logger.error('Failed to send cancellation email:', error);
  }
};

export const sendBookingCompletion = async (booking: IBooking) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    logger.warn('SMTP credentials not configured. Email not sent.');
    return;
  }

  const { customerName, email, serviceType } = booking;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Abdur Rehman Auto Garage" <noreply@abdurrehman.com>',
    to: email,
    subject: `Service Completed: ${serviceType} - Abdur Rehman Auto Garage`,
    html: getEmailLayout(`
      <h2 style="color: #333; margin-top: 0; font-size: 20px;">Hello ${customerName},</h2>
      <p style="color: #666; font-size: 16px;">
        We are pleased to inform you that the service for your vehicle (<strong>${serviceType}</strong>) has been <strong>successfully completed</strong>!
      </p>
      <p style="color: #666; font-size: 16px;">
        Our priority is to keep your vehicle running smoothly and safely on the road.
      </p>
      <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 1px dashed #dddddd;">
        <h3 style="margin: 0; color: #333; font-size: 18px;">How was your experience?</h3>
        <p style="color: #666; margin: 10px 0 20px; font-size: 14px;">Your feedback helps us provide even better service.</p>
        <div style="text-align: center;">
          <a href="https://g.page/r/your-google-review-link" class="mobile-full" style="background-color: #333; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 13px; display: inline-block;">Leave a Google Review</a>
        </div>
      </div>
      <p style="color: #666; font-size: 16px;">
        Thank you for choosing <strong>Abdur Rehman Auto Garage</strong>. We look forward to serving you again!
      </p>
    `),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.log(`Completion email sent to: ${email}`);
  } catch (error) {
    logger.error('Failed to send completion email:', error);
  }
};
