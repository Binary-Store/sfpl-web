import Hero from "@/components/pages/home/hero";
import Products from "@/components/pages/home/products";
import Clients from "@/components/pages/home/clients";
import Vision from "@/components/pages/home/vision";
import "@/components/pages/home/styles/home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Vision />

      <Products />
      <Clients />
    </>
  );
}
