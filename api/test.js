// :3
export default function handler(req, res) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Факты о кошках</title>
      <style>
        body { font-family: Arial, sans-serif; }
      </style>
    </head>
    <body>
      <h1>Факты о кошках</h1>
      <p>Кошки могут прыгать в 6 раз выше своего роста.</p>
      <p>У кошек 32 мышцы в каждом ухе.</p>
      <p>Кошки могут издавать более 100 различных звуков.</p>
      <p>Кошки спят около 16 часов в день.</p>
      <p>У кошек есть специальное чувство, позволяющее им находить хозяев.</p>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(htmlContent);
}