import Navbar from "@/components/common/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
        <Navbar />
    </main>
  );
}
