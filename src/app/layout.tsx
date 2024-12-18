import "./globals.css";
import { AuthProvider } from "./_contexts/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="h-screen w-screen flex justify-center items-center">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
