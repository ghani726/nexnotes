import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: {
        default: "NexNotes - A Notes App",
        template: "%s | NexNotes",
    },
    description: "An all in one platform to manage and shares notes on the go.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}
            suppressHydrationWarning
        >
            <head>
                <Script
                    id="Theme"
                    dangerouslySetInnerHTML={{
                        __html: `try {
                                  const mq = window.matchMedia("(prefers-color-scheme: dark)");

                                  const applyTheme = () => {
                                      const theme = localStorage.getItem("theme");

                                      // If theme is explicitly "dark" or ({["if there is no theme and current is dark"]}) or ({["if theme is system and current them is dark"]})

                                      const shouldBeDark = theme === "dark" || (!theme && mq.matches) || (theme === "system" && mq.matches)
                                      if (shouldBeDark) {
                                          document.documentElement.classList.add("dark");
                                      } else {
                                          document.documentElement.classList.remove("dark");

                                      }
                                  }

                                  applyTheme()

                                  mq.addEventListener("change", () => {
                                      const theme = localStorage.getItem("theme");

                                      if (!theme || theme === "system") {
                                          applyTheme()
                                      }
                                  })
                              } catch (e) {
                                  console.log(e);
                              }
                      `,
                    }}
                ></Script>
            </head>
            <body className="min-h-full w-full bg-background text-primary-text max-w-full flex flex-col">
                {children}
            </body>
        </html>
    );
}
