/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

module.exports = nextConfig;
