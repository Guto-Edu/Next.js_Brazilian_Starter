// next.config.mjs

/**
 * Configuração base para projetos Next.js.
 *
 * Cobre:
 * - App Router e Pages Router
 * - React Compiler
 * - Imagens locais e remotas
 * - Segurança básica via headers
 * - Redirects e rewrites
 * - Build para Vercel, Render, Docker ou VPS
 * - TypeScript, ESLint e pacotes externos
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Melhorias gerais
   */
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,

  /**
   * Gera sourcemaps no browser em produção.
   * Deixe false em projetos públicos para não expor estrutura do código.
   */
  productionBrowserSourceMaps: false,

  /**
   * Útil para Docker, Render, Railway, VPS etc.
   *
   * Para ativar:
   * NEXT_OUTPUT=standalone
   *
   * Na Vercel, normalmente deixe sem essa env.
   */
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,

  /**
   * Rotas tipadas.
   *
   * Funciona melhor em projetos com TypeScript.
   * Em projeto JS puro, pode remover se incomodar.
   */
  typedRoutes: true,

  /**
   * Permite usar extensões comuns de páginas/rotas.
   * Também deixa preparado para MD/MDX caso você adicione suporte depois.
   */
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  /**
   * Imagens
   *
   * Adicione aqui os domínios que seu projeto usa:
   * - Supabase Storage
   * - Cloudinary
   * - imagens de APIs externas
   * - CDN própria
   */
  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],

    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/assets/**",
        search: "",
      },
      {
        pathname: "/uploads/**",
        search: "",
      },
    ],

    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],

    minimumCacheTTL: 60,

    dangerouslyAllowSVG: false,
  },

  /**
   * Pacotes que o Next deve transpilar.
   *
   * Muito útil em:
   * - monorepo
   * - packages locais
   * - biblioteca UI própria
   *
   * Exemplo:
   * transpilePackages: ["@suaempresa/ui", "@suaempresa/utils"],
   */
  transpilePackages: [],

  /**
   * Bom para projetos que ainda usam Pages Router.
   */
  bundlePagesRouterDependencies: true,

  /**
   * Pacotes que devem ficar externos no servidor.
   *
   * Útil para libs que usam recursos nativos do Node.
   */
  serverExternalPackages: [],

  /**
   * Build
   *
   * Minha opinião: nunca ignore erro de TypeScript/ESLint no starter.
   * Starter público tem que ensinar certo, não empurrar poeira pra baixo do tapete.
   */
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  /**
   * Turbopack
   *
   * Mantém espaço para customização futura sem travar projeto atual.
   */
  turbopack: {},

  /**
   * Otimização de imports.
   *
   * Ajuda bastante em libs grandes ou muito usadas.
   * Pode deixar mesmo que nem todas estejam instaladas.
   */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "lodash-es",
      "framer-motion",
      "recharts",
      "@radix-ui/react-icons",
    ],

    /**
     * Use apenas se tiver Server Actions sendo chamadas por domínio/proxy externo.
     *
     * Exemplo:
     * serverActions: {
     *   allowedOrigins: ["meusite.com", "*.meusite.com"],
     * },
     */
  },

  /**
   * Headers globais.
   *
   * Segurança básica sem ser agressiva demais.
   * CSP muito rígido pode quebrar imagens, scripts, analytics e Supabase se mal configurado.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },

  /**
   * Redirects.
   *
   * Use para rotas antigas, mudança de URL, migração de site etc.
   */
  async redirects() {
    return [
      // Exemplo:
      // {
      //   source: "/old-page",
      //   destination: "/new-page",
      //   permanent: true,
      // },
    ];
  },

  /**
   * Rewrites.
   *
   * Útil para proxy de API, backend externo ou evitar expor URL interna no front.
   *
   * Exemplo:
   * NEXT_PUBLIC_API_URL=https://api.seusite.com
   */
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return [
      ...(apiUrl
        ? [
            {
              source: "/api/proxy/:path*",
              destination: `${apiUrl}/:path*`,
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;