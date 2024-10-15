import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "MemberEase",
  description: "A one stop solution for managing your community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-3xl mx-auto p-4">
          <Navbar />
          <div className="mt-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
