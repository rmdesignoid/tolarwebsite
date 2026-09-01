# Envio do formulário de contato

O formulário está preparado para chamar um endpoint HTTP configurado na variável `NEXT_PUBLIC_CONTACT_ENDPOINT` durante o build do site estático.

## Contrato do endpoint

- Método: `POST`
- Cabeçalho: `Content-Type: application/json`
- Corpo: `{ "nome": string, "email": string, "empresa": string, "telefone": string }`
- Sucesso: resposta `2xx` com JSON opcional
- Erro: resposta diferente de `2xx` com `{ "message": string }` opcional

## Configuração na hospedagem final

1. Definir o domínio de envio e verificar SPF/DKIM na Resend.
2. Criar o endpoint no servidor do cliente. A credencial `RESEND_API_KEY` deve existir apenas nesse servidor.
3. Usar `createContactEmail` de `lib/contact-email-template.ts` para gerar assunto, versão HTML e texto simples.
4. Definir `NEXT_PUBLIC_CONTACT_ENDPOINT` com a URL pública do endpoint e fazer um novo build do site.
5. Enviar um teste para o destinatário definido pelo cliente.

O template inclui logo, cabeçalho escuro, tipografia, cores e a barra lateral azul usadas no site da Tolar.
