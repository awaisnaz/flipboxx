const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.blob.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "i0.wp.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            }
        ],
    }
};

export default nextConfig;
