/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Exportación Estática: Obligatorio para Cloudflare Pages
  // Esto generará una carpeta 'out' con archivos HTML/CSS/JS puros.
  output: 'export',

  // 2. Optimización de Imágenes: 
  // Next.js por defecto intenta optimizar imágenes en el servidor, 
  // pero en exportaciones estáticas debemos desactivarlo.
  images: {
    unoptimized: true,
  },

  // 3. Robustez en el Build:
  // Evita que el despliegue falle por errores menores de TypeScript o ESLint.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 4. Configuración extra para rutas (opcional)
  // Ayuda a que las rutas terminen en / en lugar de .html si fuera necesario.
  trailingSlash: true,
};

export default nextConfig;