import { logger } from './logger';

// Clean environment variables (remove surrounding quotes if they exist)
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN?.replace(/^["'](.+)["']$/, '$1').replace(/["']/g, '');
const CHAT_ID = process.env.TELEGRAM_CHAT_ID?.replace(/^["'](.+)["']$/, '$1').replace(/["']/g, '');

/**
 * Escapes HTML special characters for Telegram HTML mode.
 */
export function escapeHTML(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendTelegramMessage(text: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    logger.warn('[Telegram] Skipping notification: Credentials not configured.');
    return { success: false, error: 'Telegram configuration missing' };
  }

  // Mask token for logging: "1234...abcd"
  const maskedToken = BOT_TOKEN.length > 10 
    ? `${BOT_TOKEN.substring(0, 4)}...${BOT_TOKEN.substring(BOT_TOKEN.length - 4)}`
    : '***';

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      logger.error('[Telegram Error]', {
        status: response.status,
        description: data.description,
        tokenUsed: maskedToken,
        chatId: CHAT_ID
      });
      return { success: false, error: data.description };
    }

    return { success: true, data };
  } catch (error) {
    logger.error('[Telegram Exception]', error);
    return { success: false, error: 'Connection failed' };
  }
}
