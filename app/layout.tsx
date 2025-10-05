import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Выбери подходящий для себя тариф",
  description: "Фитнес приложение с различными тарифными планами",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
