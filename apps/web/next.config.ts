import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: false,
    partialPrefetching: false,
    reactCompiler: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
    
    redirects: async () => {
        return [
            { source: "/sign-in", destination: "/login", permanent: true },
            { source: "/signin", destination: "/login", permanent: true },
            { source: "/sign-up", destination: "/register", permanent: true },
            { source: "/signup", destination: "/register", permanent: true },
            { source: "/home", destination: "/", permanent: true },
        ];
    },
};

export default nextConfig;
