export type ContactLead = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] ?? character);
}

export function createContactEmail(lead: ContactLead, siteUrl = "https://tolarwebsite.vercel.app") {
  const safeLead = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)])) as ContactLead;
  const replyUrl = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent("Contato Tolar")}`;

  return {
    subject: `Novo contato Tolar — ${lead.name}`,
    text: `Novo contato recebido pela Tolar\n\nNome: ${lead.name}\nE-mail: ${lead.email}\nEmpresa: ${lead.company}\nTelefone: ${lead.phone}`,
    html: `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f3f6fa;font-family:Arial,sans-serif;color:#11192c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fa;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">
          <tr><td style="padding:28px 36px;background:#11192c;">
            <img src="${siteUrl}/assets/tolar-logo.svg" width="120" height="21" alt="Tolar" style="display:block;border:0;max-width:120px;height:auto;" />
          </td></tr>
          <tr><td style="padding:36px;">
            <p style="margin:0 0 10px;color:#1687c4;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Novo contato pelo site</p>
            <h1 style="margin:0 0 12px;color:#11192c;font-size:30px;line-height:36px;font-weight:700;">Uma nova oportunidade chegou.</h1>
            <p style="margin:0 0 28px;color:#536174;font-size:16px;line-height:24px;">Confira os dados enviados pelo formulário de contato da Tolar.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dce7ef;border-radius:12px;background:#f8fbfd;">
              <tr><td style="padding:18px 20px;border-left:4px solid #1687c4;">
                <p style="margin:0 0 4px;color:#667085;font-size:12px;line-height:16px;">Nome</p><p style="margin:0;color:#11192c;font-size:16px;line-height:22px;font-weight:700;">${safeLead.name}</p>
              </td></tr>
              <tr><td style="padding:18px 24px;border-top:1px solid #dce7ef;"><p style="margin:0 0 4px;color:#667085;font-size:12px;line-height:16px;">E-mail corporativo</p><p style="margin:0;color:#11192c;font-size:16px;line-height:22px;font-weight:700;">${safeLead.email}</p></td></tr>
              <tr><td style="padding:18px 24px;border-top:1px solid #dce7ef;"><p style="margin:0 0 4px;color:#667085;font-size:12px;line-height:16px;">Empresa</p><p style="margin:0;color:#11192c;font-size:16px;line-height:22px;font-weight:700;">${safeLead.company}</p></td></tr>
              <tr><td style="padding:18px 24px;border-top:1px solid #dce7ef;"><p style="margin:0 0 4px;color:#667085;font-size:12px;line-height:16px;">Telefone</p><p style="margin:0;color:#11192c;font-size:16px;line-height:22px;font-weight:700;">${safeLead.phone}</p></td></tr>
            </table>
            <p style="margin:28px 0 0;"><a href="${replyUrl}" style="display:inline-block;padding:13px 22px;border-radius:999px;background:#00598b;color:#ffffff;font-size:14px;line-height:20px;font-weight:700;text-decoration:none;">Responder ao contato&nbsp; ›</a></p>
          </td></tr>
          <tr><td style="padding:20px 36px;background:#080f1d;"><p style="margin:0;color:#b8c3cf;font-size:12px;line-height:18px;">Mensagem gerada pelo formulário do site Tolar.</p></td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  };
}
