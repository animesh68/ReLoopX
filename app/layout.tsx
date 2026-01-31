import "./globals.css";
import Navbar from "@/components/navbar"; // lowercase matches filename

export const metadata = {
  title: "ReLoop X",
  description: "Closed-loop circular economy platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
