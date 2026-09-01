# Tolar — site estático para VPS

O site é exportado como arquivos estáticos e pode ser servido diretamente por
Nginx ou Apache. Não depende de Cloudflare, Workers, banco de dados ou de um
processo Node em produção.

## Requisitos para gerar a publicação

- Node.js `>=22.13.0`

## Gerar os arquivos de produção

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://tolar.com.br npm run build
```

No Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://tolar.com.br"
npm run build
```

O resultado é gerado em `out/`. Envie todo o conteúdo dessa pasta para
`/var/www/tolar/site/out` na VPS.

## Nginx

```nginx
server {
    listen 80;
    server_name tolar.com.br www.tolar.com.br;

    root /var/www/tolar/site/out;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location ~* \.(css|js|png|jpg|jpeg|webp|svg|ico|pdf)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Após configurar o DNS, use Certbot para ativar HTTPS. Nenhuma porta de
aplicação (como 3000) precisa ficar exposta.
