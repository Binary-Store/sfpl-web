import Image from "next/image";

const clients = [
  { src: "/images/clients/adani.webp", alt: "Adani" },
  { src: "/images/clients/anant.webp", alt: "Anant" },
  { src: "/images/clients/binori.webp", alt: "Binori" },
  { src: "/images/clients/dilip-ladani.webp", alt: "Dilip Ladani" },
  { src: "/images/clients/ekaam.png", alt: "Ekaam" },
  { src: "/images/clients/gol.webp", alt: "Gol" },
  { src: "/images/clients/lifestyle.webp", alt: "Lifestyle" },
  { src: "/images/clients/lord.webp", alt: "Lord" },
  { src: "/images/clients/Malani.png", alt: "Malani" },
  { src: "/images/clients/oscar.webp", alt: "Oscar" },
  { src: "/images/clients/palladium.webp", alt: "Palladium" },
  { src: "/images/clients/railway.webp", alt: "Railway" },
  { src: "/images/clients/rk.webp", alt: "RK" },
  { src: "/images/clients/sarovar.webp", alt: "Sarovar" },
  { src: "/images/clients/shivalik_ship.jpg", alt: "Shivalik Ship" },
  { src: "/images/clients/the_view.jpg", alt: "The View" },
  { src: "/images/clients/the-fern.webp", alt: "The Fern" },
  { src: "/images/clients/van-heusen.webp", alt: "Van Heusen" },
  { src: "/images/clients/wtc.webp", alt: "WTC" },
  { src: "/images/clients/zudio.webp", alt: "Zudio" },
];

export default function Clients() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 space-y-10">

        <h2 className="text-2xl font-bold text-center">Our Clients</h2>

        <div className="flex items-center gap-7 overflow-hidden text-muted-foreground">
          <div className="technology-ticker-section-left flex gap-7 flex-nowrap whitespace-nowrap shrink-0 h-fit">
            {[...clients.slice(0, clients.length / 2)].map((client, idx) => (
              <div key={"top-" + idx} className="mx-6 inline-block">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={100}
                  height={60}
                  className="object-contain h-14 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="technology-ticker-section-left flex gap-7 flex-nowrap whitespace-nowrap shrink-0 h-fit">
            {[...clients.slice(0, clients.length / 2)].map((client, idx) => (
              <div key={"top-" + idx} className="mx-6 inline-block">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={100}
                  height={60}
                  className="object-contain h-14 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-7 overflow-hidden text-muted-foreground">
          <div className="technology-ticker-section-right flex gap-7 flex-nowrap whitespace-nowrap shrink-0 h-fit">
            {[...clients.slice(clients.length / 2)].map((client, idx) => (
              <div key={"top-" + idx} className="mx-6 inline-block">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={100}
                  height={60}
                  className="object-contain h-14 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="technology-ticker-section-right flex gap-7 flex-nowrap whitespace-nowrap shrink-0 h-fit">
            {[...clients.slice(clients.length / 2)].map((client, idx) => (
              <div key={"top-" + idx} className="mx-6 inline-block">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={100}
                  height={60}
                  className="object-contain h-14 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}