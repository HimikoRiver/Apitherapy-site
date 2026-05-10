import "./globals.css";

export const metadata = {
  title: "Dr. Pchelka — апитерапия в Грозном",
  description:
    "Апитерапия и лечение пчелиным ядом в Грозном от Амины Мазаевой.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
