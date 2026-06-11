import { AuthLayout } from "@/components/layout/auth-layout";

export default function AuthGroupLayout({ children }) {
  return (
    /*
      Tudo que estiver dentro de src/app/(auth) vai usar esse layout.

      Exemplo:
      src/app/(auth)/login/page.js    -> /login
      src/app/(auth)/register/page.js -> /register

      O nome (auth) não aparece na URL.
    */
    <AuthLayout>{children}</AuthLayout>
  );
}