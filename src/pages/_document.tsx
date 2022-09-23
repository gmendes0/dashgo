import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel=" icon"
            href="/favicon/favicon-32x32.png"
            sizes="32x32"
            type="image/png"
          />
          <link
            rel=" icon"
            href="/favicon/favicon-16x16.png"
            sizes="16x16"
            type="image/png"
          />
          <link
            rel=" icon"
            href="/favicon/android-chrome-192x192.png"
            sizes="192x192"
            type="image/png"
          />
          <link
            rel=" icon"
            href="/favicon/android-chrome-512x512.png"
            sizes="512x512"
            type="image/png"
          />
          <link
            rel=" icon"
            href="/favicon/apple-touch-icon.png"
            sizes="180x180"
            type="image/png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
