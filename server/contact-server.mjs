import http from "node:http";
import nodemailer from "nodemailer";

const PORT = Number(process.env.CONTACT_PORT ?? 3001);
const MAX_BODY_BYTES = 10_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const attemptsByIp = new Map();

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const transporter = nodemailer.createTransport({
  host: required("SMTP_HOST"),
  port: Number(required("SMTP_PORT")),
  secure: false,
  requireTLS: true,
  auth: {
    user: required("SMTP_USER"),
    pass: required("SMTP_PASS"),
  },
  tls: { minVersion: "TLSv1.2" },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character] ?? character);

function reply(response, status, body = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("payload-too-large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("invalid-json"));
      }
    });
    request.on("error", reject);
  });
}

function isRateLimited(ip) {
  const now = Date.now();
  const attempts = (attemptsByIp.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (attempts.length >= MAX_REQUESTS_PER_WINDOW) return true;
  attempts.push(now);
  attemptsByIp.set(ip, attempts);
  return false;
}

function validateLead(body) {
  const lead = {
    name: String(body.nome ?? "").trim(),
    email: String(body.email ?? "").trim(),
    company: String(body.empresa ?? "").trim(),
    phone: String(body.telefone ?? "").trim(),
  };
  const phoneDigits = lead.phone.replace(/\D/g, "");
  if (lead.name.length < 2 || lead.company.length < 2) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return null;
  if (phoneDigits.length < 10 || phoneDigits.length > 13) return null;
  return lead;
}

function contactEmail(lead) {
  const safe = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)]));
  return {
    subject: `Novo contato Tolar — ${lead.name}`,
    text: `Novo contato recebido pelo site Tolar\n\nNome: ${lead.name}\nE-mail: ${lead.email}\nEmpresa: ${lead.company}\nTelefone: ${lead.phone}`,
    html: `<!doctype html><html lang="pt-BR"><body style="margin:0;padding:24px;background:#f3f6fa;font-family:Arial,sans-serif;color:#11192c"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:26px 32px;background:#080f1d;color:#fff"><strong style="font-size:21px">TOLAR</strong><p style="margin:8px 0 0;color:#9fc8df;font-size:12px;letter-spacing:1px;text-transform:uppercase">Novo contato pelo site</p></td></tr><tr><td style="padding:32px"><h1 style="margin:0 0 12px;font-size:26px">Uma nova oportunidade chegou.</h1><p style="margin:0 0 24px;color:#536174;line-height:24px">Confira os dados enviados pelo formulário de contato.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce7ef;border-radius:12px"><tr><td style="padding:16px 20px"><small>Nome</small><br><strong>${safe.name}</strong></td></tr><tr><td style="padding:16px 20px;border-top:1px solid #dce7ef"><small>E-mail corporativo</small><br><strong>${safe.email}</strong></td></tr><tr><td style="padding:16px 20px;border-top:1px solid #dce7ef"><small>Empresa</small><br><strong>${safe.company}</strong></td></tr><tr><td style="padding:16px 20px;border-top:1px solid #dce7ef"><small>Telefone</small><br><strong>${safe.phone}</strong></td></tr></table></td></tr></table></td></tr></table></body></html>`,
  };
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/api/contact") {
    reply(response, 404, { message: "Not found" });
    return;
  }

  const ip = String(request.headers["x-real-ip"] ?? "unknown");
  if (isRateLimited(ip)) {
    reply(response, 429, { message: "Too many requests" });
    return;
  }

  try {
    const body = await readJson(request);
    if (String(body.website ?? "").trim()) {
      reply(response, 204);
      return;
    }
    const lead = validateLead(body);
    if (!lead) {
      reply(response, 400, { message: "Invalid contact data" });
      return;
    }
    const email = contactEmail(lead);
    await transporter.sendMail({
      from: required("MAIL_FROM"),
      to: required("MAIL_TO"),
      replyTo: lead.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
    reply(response, 204);
  } catch (error) {
    if (error?.message === "payload-too-large") {
      reply(response, 413, { message: "Payload too large" });
      return;
    }
    if (error?.message === "invalid-json") {
      reply(response, 400, { message: "Invalid request" });
      return;
    }
    console.error("Contact email delivery failed", error instanceof Error ? error.message : "unknown error");
    reply(response, 502, { message: "Delivery unavailable" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Contact service listening on 127.0.0.1:${PORT}`);
});
