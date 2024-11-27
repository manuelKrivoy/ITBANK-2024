/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Agregar dominios permitidos para imágenes
  images: {
    domains: ["thispersondoesnotexist.com"],
  },
  // Otras configuraciones aquí
};

export default nextConfig;
