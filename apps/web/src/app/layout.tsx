import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    metadataBase: new URL("https://nexnotes.com"),
    title: {
        default: "NexNotes - A Notes App",
        template: "%s | NexNotes",
    },
    description: "An all in one platform to manage and shares notes on the go.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "NexNotes | A Notes App ",
        description:
            "Explore our app to how to manage your notes and tasks efficiently.",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}
            suppressHydrationWarning={true}
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

                <Toaster
                    toastOptions={{
                        style: {
                            backgroundColor: "var(--surface)",
                            color: "var(--text-primary)",
                            borderRadius: "2rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                        },
                        success: {
                            iconTheme: {
                                primary: "var(--status-success)",
                                secondary: "",
                            },
                            style: {
                                backgroundColor: "var(--status-success-subtle)",
                            },
                            // className: "bg-status-success-subtle"
                        },
                        error: {
                            iconTheme: {
                                primary: "var(--status-error)",
                                secondary: "",
                            },
                            style: {
                                backgroundColor: "var(--status-error-subtle)",
                            },
                        },
                    }}
                ></Toaster>
            </body>
        </html>
    );
}
