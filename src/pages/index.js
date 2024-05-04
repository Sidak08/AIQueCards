import Navbar from "@/components/common/Navbar";
import Introduction from "@/components/homepage/Introduction";
import BackgroundBeams from "@/components/ui/background-beams";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
        <Navbar />
        <Introduction />
    </main>
  );
}
