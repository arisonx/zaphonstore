import { Inter, Roboto } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--inter" });

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500"],
  variable: "--roboto",
});
