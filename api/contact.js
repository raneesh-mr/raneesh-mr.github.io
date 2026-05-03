export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, company, interest, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const RESEND_API_KEY  = process.env.RESEND_API_KEY;
    const SUPABASE_URL    = process.env.SUPABASE_URL;
    const SUPABASE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // ── 1. Save lead to Supabase
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        email,
        phone:    phone    || null,
        company:  company  || null,
        interest: interest || null,
        message,
        source: 'raneesh.net',
        status: 'New'
      })
    });

    if (!supabaseRes.ok) {
      const err = await supabaseRes.text();
      console.error('Supabase error:', err);
    }

    // ── 2. Send email via Resend
    const emailHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:0">
        <div style="background:#071728;padding:28px 32px">
          <h1 style="color:#C8973C;font-size:22px;margin:0">New Enquiry — raneesh.net</h1>
        </div>
        <div style="background:#ffffff;padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:120px;font-size:13px">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;font-size:14px">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">
                <a href="mailto:${email}" style="color:#C8973C">${email}</a>
              </td>
            </tr>
            ${phone ? `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${phone}</td>
            </tr>` : ''}
            ${company ? `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px">Company</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${company}</td>
            </tr>` : ''}
            ${interest ? `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px">Interest</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px">${interest}</td>
            </tr>` : ''}
            <tr>
              <td style="padding:10px 0;color:#666;font-size:13px;vertical-align:top">Message</td>
              <td style="padding:10px 0;font-size:14px;line-height:1.6">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
        <div style="background:#071728;padding:20px 32px;text-align:center">
          <a href="mailto:${email}" style="background:#C8973C;color:#071728;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px">
            Reply to ${name}
          </a>
        </div>
        <p style="text-align:center;font-size:11px;color:#999;padding:16px">
          Sent from raneesh.net · Lead saved to Supabase
        </p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from:     'Raneesh Website <hello@raneesh.net>',
        to:       ['raneesh.mr08@gmail.com'],
        reply_to: email,
        subject:  `New Enquiry: ${interest || 'General'} — ${name}`,
        html:     emailHtml
      })
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('Resend error:', err);
      return new Response(JSON.stringify({ error: 'Email failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Handler error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
