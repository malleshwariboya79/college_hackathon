import "./globals.css";

export const metadata = {
  title: "Academic Planner",
  description: "Student Productivity Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
