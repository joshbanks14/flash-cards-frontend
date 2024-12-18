export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full grid grid-cols-2">
      <div className="w-full h-full flex justify-center items-center bg-[#0c331b]">{children}</div>
      <div className="w-full h-full"></div>
    </div>
  );
}
