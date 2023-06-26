export function templateConfirmAccount(confirmCode: string): string {
  // TODO: Adicionar .env de ambiente e URL
  const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>Confirme sua conta</title>
    </head>
    <body>
        <h1>Olá!</h1>
        <p>Por favor clique no botão abaixo para confirmar sua conta!</p>
        <a href="http://localhost:3000/user/active?code=${confirmCode}" target="_blank" style="display:inline-block; background-color:#008CBA; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px;">Clique Aqui</a>
        <p>Obrigado!</p>
    </body>
    </html>
    `;

  return html;
}
