export const metadata = {
  title: "Convertly - Conversor de Imagens Online",
  description: "Converta, compacte e redimensione imagens gratuitamente com o Convertly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head />
      <body>{children}</body>
    </html>
  );
}
