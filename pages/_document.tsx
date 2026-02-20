import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#0D9488" />
          <meta
            name="description"
            content="ENSENADA 101 — Tacos de pescado y burritos estilo Ensenada. Pr&oacute;ximamente en Roma Sur, CDMX. Capeados en cerveza, salsas frescas, vibra Baja."
          />
          <meta property="og:site_name" content="Ensenada 101" />
          <meta
            property="og:description"
            content="Tacos de pescado y burritos estilo Ensenada. Pr&oacute;ximamente en Roma Sur, CDMX."
          />
          <meta
            property="og:title"
            content="Ensenada 101 — Tacos de Pescado y Burritos — Roma Sur, CDMX"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Ensenada 101 — Tacos de Pescado y Burritos — Roma Sur, CDMX"
          />
          <meta
            name="twitter:description"
            content="Tacos de pescado y burritos estilo Ensenada. Pr&oacute;ximamente en Roma Sur."
          />
        </Head>
        <body className="bg-white antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
