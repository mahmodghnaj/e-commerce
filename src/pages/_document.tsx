import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                    var d = document.documentElement;
                    var e = localStorage.getItem('theme');
                    if (e === 'system' || !e) {
                        var t = '(prefers-color-scheme: dark)';
                        var m = window.matchMedia(t);
                        if (m.media !== t || m.matches) {
                            d.setAttribute("data-theme", 'dark');
                        } else {
                            d.setAttribute("data-theme", 'light');
                        }
                    } else {
                        d.setAttribute("data-theme", e || '');
                    }
                } catch (err) {
                    console.error('Theme detection error:', err);
                }
              })();
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
