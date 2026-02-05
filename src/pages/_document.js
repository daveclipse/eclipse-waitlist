import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/eclipse_logo_white.png" />
        <meta name="theme-color" content="#1D225B" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
