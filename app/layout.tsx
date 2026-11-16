import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizwan Khan — Independent Digital & Visual Designer | CreativeRizz",
  description: "Portfolio of Rizwan Khan, a Jaipur-based UI/UX and graphic designer creating digital products, brand systems, visual campaigns and responsive websites.",
  metadataBase: new URL("https://www.creativerizz.in"),
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
