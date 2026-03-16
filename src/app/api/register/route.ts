import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TIME_LABELS: Record<string, { label: string; range: string }> = {
  morning:   { label: "Morning",   range: "6:00 AM – 12:00 PM" },
  afternoon: { label: "Afternoon", range: "12:00 PM – 5:00 PM" },
  evening:   { label: "Evening",   range: "5:00 PM – 9:00 PM" },
};

const PROGRAM_LABELS: Record<string, string> = {
  "bjj-gi":  "BJJ GI — Traditional",
  "bjj-nogi":"BJJ NO-GI — No Kimono",
  "mma":     "MMA / Wrestling",
  "kids":    "Kids & Youth (Ages 4+)",
  "veteran": "Veterans & Law Enforcement",
  "private": "Private Lessons",
};

function buildEmail(data: {
  name: string;
  program: string;
  preferredDay: string;
  preferredTime: string;
}): string {
  const firstName = data.name.split(" ")[0];
  const program = PROGRAM_LABELS[data.program] ?? data.program;
  const time = TIME_LABELS[data.preferredTime] ?? { label: data.preferredTime, range: "" };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Free Class is Booked!</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111111;border-radius:16px;overflow:hidden;border:1px solid rgba(212,167,75,0.15);">

          <!-- Header bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#191100,#0d0d0d);padding:36px 40px 32px;text-align:center;border-bottom:1px solid rgba(212,167,75,0.12);">
              <!-- Logo text -->
              <p style="margin:0 0 20px;color:rgba(212,167,75,0.7);font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">MIDLAND BJJ &amp; MMA</p>
              <!-- Big title -->
              <h1 style="margin:0;color:#ffffff;font-size:38px;font-weight:900;letter-spacing:-0.01em;line-height:1;text-transform:uppercase;">
                YOU'RE<br/>
                <span style="background:linear-gradient(135deg,#EDD077,#D4A74B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">ON THE MATS.</span>
              </h1>
              <p style="margin:16px 0 0;color:rgba(255,255,255,0.42);font-size:14px;line-height:1.6;">
                Your free class has been confirmed, ${firstName}.<br/>We'll see you soon.
              </p>
            </td>
          </tr>

          <!-- Details card -->
          <tr>
            <td style="padding:32px 40px;">

              <!-- Day + Time block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:rgba(212,167,75,0.06);border:1px solid rgba(212,167,75,0.15);border-radius:12px;padding:22px 24px;">
                    <p style="margin:0 0 16px;color:rgba(255,255,255,0.3);font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">Your Session</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding-right:12px;">
                          <p style="margin:0 0 4px;color:rgba(212,167,75,0.6);font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Day</p>
                          <p style="margin:0;color:#ffffff;font-size:20px;font-weight:800;text-transform:uppercase;">${data.preferredDay}</p>
                        </td>
                        <td width="50%" style="border-left:1px solid rgba(255,255,255,0.07);padding-left:12px;">
                          <p style="margin:0 0 4px;color:rgba(212,167,75,0.6);font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">${time.label}</p>
                          <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;">${time.range}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Program -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:16px 20px;">
                    <p style="margin:0 0 4px;color:rgba(212,167,75,0.6);font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Program</p>
                    <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">${program}</p>
                  </td>
                </tr>
              </table>

              <!-- What to bring -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px;">
                    <p style="margin:0 0 12px;color:rgba(255,255,255,0.3);font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">What to bring</p>
                    <p style="margin:0 0 6px;color:rgba(255,255,255,0.55);font-size:13px;line-height:1.7;">
                      ✓ &nbsp;Comfortable workout clothes<br/>
                      ✓ &nbsp;Water bottle<br/>
                      ✓ &nbsp;Clean feet &amp; trimmed nails<br/>
                      ✓ &nbsp;Your fighting spirit
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Location -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center" style="padding:18px 20px;background:rgba(212,167,75,0.04);border:1px solid rgba(212,167,75,0.1);border-radius:10px;">
                    <p style="margin:0 0 2px;color:rgba(212,167,75,0.7);font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Where to go</p>
                    <p style="margin:0;color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;">4612 Billingsley Blvd · Midland, TX 79705</p>
                    <p style="margin:4px 0 0;color:rgba(255,255,255,0.3);font-size:12px;">Mon–Fri 6am–9pm &nbsp;·&nbsp; Sat 8am–2pm</p>
                  </td>
                </tr>
              </table>

              <!-- CTA note -->
              <p style="margin:0;color:rgba(255,255,255,0.25);font-size:12px;text-align:center;line-height:1.7;">
                Questions? Reply to this email or call us directly.<br/>
                We'll also reach out to confirm the details before your class.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.15);font-size:11px;letter-spacing:0.1em;">
                MIDLAND BJJ &amp; MMA &nbsp;·&nbsp; STAY RELENTLESS
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, phone, program, preferredDay, preferredTime, notes } = body;

    if (!name || !email || !phone || !program || !preferredDay || !preferredTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const firstName = name.split(" ")[0];
    const time = TIME_LABELS[preferredTime] ?? { label: preferredTime, range: "" };

    const { error } = await resend.emails.send({
      from: "Midland BJJ & MMA <onboarding@resend.dev>",
      to: [email],
      subject: `${firstName}, you're on the mats — Free Class Confirmed`,
      html: buildEmail({ name, program, preferredDay, preferredTime }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // Optional: notify the gym staff
    if (process.env.GYM_NOTIFY_EMAIL) {
      await resend.emails.send({
        from: "Midland BJJ Website <onboarding@resend.dev>",
        to: [process.env.GYM_NOTIFY_EMAIL],
        subject: `New free class booking — ${name}`,
        html: `<p><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone:</b> ${phone}<br/><b>Program:</b> ${PROGRAM_LABELS[program] ?? program}<br/><b>Day:</b> ${preferredDay}<br/><b>Time:</b> ${time.label} (${time.range})<br/><b>Notes:</b> ${notes || "—"}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Register route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
