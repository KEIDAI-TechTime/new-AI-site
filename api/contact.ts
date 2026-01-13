import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';
import { Resend } from 'resend';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { company, name, email, phone, systemType, budget, timeline, message } = req.body;

    // Validate required fields
    if (!company || !name || !email || !systemType || !budget || !timeline || !message) {
      return res.status(400).json({ error: '必須項目が入力されていません' });
    }

    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Add to Notion database
    if (process.env.CONTACT_NOTION_DATABASE_ID) {
      try {
        await notion.pages.create({
          parent: {
            database_id: process.env.CONTACT_NOTION_DATABASE_ID,
          },
          properties: {
            '会社名': {
              title: [
                {
                  text: {
                    content: company,
                  },
                },
              ],
            },
            'お名前': {
              rich_text: [
                {
                  text: {
                    content: name,
                  },
                },
              ],
            },
            'メールアドレス': {
              email: email,
            },
            '電話番号': {
              rich_text: [
                {
                  text: {
                    content: phone || '-',
                  },
                },
              ],
            },
            'システム種別': {
              select: {
                name: systemType,
              },
            },
            '予算': {
              select: {
                name: budget,
              },
            },
            '希望納期': {
              select: {
                name: timeline,
              },
            },
            'お問い合わせ内容': {
              rich_text: [
                {
                  text: {
                    content: message,
                  },
                },
              ],
            },
            'ステータス': {
              select: {
                name: '新規',
              },
            },
          },
        });
      } catch (notionError) {
        console.error('Notion error:', notionError);
        // Continue even if Notion fails
      }
    }

    // 2. Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'TechTime お問い合わせ <onboarding@resend.dev>', // Update this after domain verification
          to: 'kdm@techtime-link.com',
          subject: '【TechTime】新規お問い合わせが届きました',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0A1628; border-bottom: 3px solid #00D9FF; padding-bottom: 10px;">
                新規お問い合わせ
              </h2>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0A1628; margin-top: 0;">お客様情報</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; width: 120px;"><strong>会社名</strong></td>
                    <td style="padding: 8px 0;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>お名前</strong></td>
                    <td style="padding: 8px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>メール</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00D9FF;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>電話番号</strong></td>
                    <td style="padding: 8px 0;">${phone || '-'}</td>
                  </tr>
                </table>
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0A1628; margin-top: 0;">案件情報</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; width: 120px;"><strong>システム種別</strong></td>
                    <td style="padding: 8px 0;">${systemType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>ご予算</strong></td>
                    <td style="padding: 8px 0;">${budget}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>希望納期</strong></td>
                    <td style="padding: 8px 0;">${timeline}</td>
                  </tr>
                </table>
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0A1628; margin-top: 0;">お問い合わせ内容</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                <p>このメールは TechTime お問い合わせフォームから自動送信されています。</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Continue even if email fails
      }
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'お問い合わせを受け付けました',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'お問い合わせの送信に失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
