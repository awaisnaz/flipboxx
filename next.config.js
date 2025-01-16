const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.blob.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com", // Added Google image host
            },
        ],
    }
};

export default nextConfig;
