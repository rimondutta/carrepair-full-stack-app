/**
 * Telegram Bot API Utility
 * Sends automated notifications to admin for business events.
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('[Telegram] Skipping notification: Credentials not configured.');
    return { success: false, error: 'Telegram configuration missing' };
  }

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
      console.error('[Telegram Error]', data);
      return { success: false, error: data.description };
    }

    return { success: true, data };
  } catch (error) {
    console.error('[Telegram Exception]', error);
    return { success: false, error: 'Connection failed' };
  }
}
