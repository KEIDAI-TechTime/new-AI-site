import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/* 相談票（/contact）の送信を受け、kdm@techtime-link.com に通知のメールを送る。
   項目は相談票と同じ名前で書く。入力された文字は、HTML として解釈されないよう必ず変換してから使う。 */

const TO = 'kdm@techtime-link.com';

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const cut = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);

const row = (label: string, value: string, link?: string) => `
  <tr>
    <td style="padding: 8px 12px 8px 0; color: #57544c; width: 140px; vertical-align: top;"><strong>${label}</strong></td>
    <td style="padding: 8px 0; color: #1c1b18;">${link ? `<a href="${link}" style="color: #d4412a;">${value}</a>` : value}</td>
  </tr>`;

const box = (title: string, body: string) => `
  <div style="background: #f2eee4; border: 1px solid #1c1b18; padding: 18px 20px; margin: 16px 0;">
    <h3 style="color: #1c1b18; margin: 0 0 8px; font-size: 15px;">${title}</h3>
    ${body}
  </div>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).json({ ok: true });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const b = (req.body || {}) as Record<string, unknown>;
    const company = cut(b.company, 120);
    const name = cut(b.name, 80);
    const email = cut(b.email, 160);
    const phone = cut(b.phone, 40);
    const situation = cut(b.situation ?? b.systemType, 80); // いまの状況（以前の項目名 systemType でも受ける）
    const timeline = cut(b.timeline, 40); // 始めたい時期
    const phases = Array.isArray(b.phases) ? (b.phases as unknown[]).map((x) => cut(x, 30)).filter(Boolean).slice(0, 12) : [];
    const topic = b.topic === 'assessment' ? 'assessment' : 'general';
    const message = cut(b.message, 2000);

    if (!company || !name || !email || !situation || !timeline || !message) {
      return res.status(400).json({ error: '必須項目が入力されていません' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'メールアドレスの形式が正しくありません' });
    }

    const topicLabel = topic === 'assessment' ? 'アセスメントのご相談' : 'ご相談';

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: 'TechTime お問い合わせ <onboarding@resend.dev>', // ドメインの確認が済んだら差出人を変える
          to: TO,
          replyTo: email,
          subject: `【TechTime】${topicLabel}が届きました（${company.replace(/[\r\n]+/g, ' ')}）`,
          html: `
            <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; color: #1c1b18;">
              <h2 style="margin: 0 0 4px; font-size: 20px;">${esc(topicLabel)}が届きました</h2>
              <p style="margin: 0 0 12px; color: #57544c; font-size: 13px;">techtime-jp.com の相談票から送信されました。このメールに返信すると、相談者に届きます。</p>
              ${box('相談者', `<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                ${row('会社名', esc(company))}
                ${row('お名前', esc(name))}
                ${row('メールアドレス', esc(email), `mailto:${esc(email)}`)}
                ${row('電話番号', esc(phone) || '-')}
              </table>`)}
              ${box('相談の内容', `<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                ${row('相談の種類', esc(topicLabel))}
                ${row('いまの状況', esc(situation))}
                ${row('相談したい工程', esc(phases.join('・')) || '（選択なし）')}
                ${row('始めたい時期', esc(timeline))}
              </table>
              <p style="margin: 12px 0 0; font-size: 13px; color: #57544c;"><strong>相談の本文</strong></p>
              <p style="white-space: pre-wrap; line-height: 1.7; font-size: 14px; margin: 4px 0 0;">${esc(message)}</p>`)}
            </div>`,
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        return res.status(502).json({ error: '通知のメールを送れませんでした' });
      }
    } else {
      console.error('RESEND_API_KEY is not set');
      return res.status(500).json({ error: '送信の設定が見つかりません' });
    }

    return res.status(200).json({ success: true, message: 'お問い合わせを受け付けました' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'お問い合わせの送信に失敗しました' });
  }
}
