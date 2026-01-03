import React from "react";

const partners = [
  {
    id: 1,
    name: "FAO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FAO_logo.svg/2017px-FAO_logo.svg.png",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    name: "BRAC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnAVg4PpvXmg_cbRQ29qEf8vOi6ZpMG4vRsA&s",
    bg: "bg-pink-50",
  },
  {
    id: 3,
    name: "USAID",
    logo: "https://images.seeklogo.com/logo-png/30/1/usaid-united-states-agency-for-international-logo-png_seeklogo-306631.png",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    name: "World Bank",
    logo: "https://crystalpng.com/wp-content/uploads/2025/08/world-bank-logo.png",
    bg: "bg-gray-50",
  },
  {
    id: 5,
    name: "Krishi Foundation",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/68b821e30f34c_organisation_image-JbBKfLZDdS1939128628taFinxsoiV.png?d=200x200",
    bg: "bg-yellow-50",
  },
  {
    id: 6,
    name: "BADC",
    logo: "https://images.seeklogo.com/logo-png/40/1/badc-logo-png_seeklogo-408076.png",
    bg: "bg-emerald-50",
  },
  {
    id: 7,
    name: "IFAD",
    logo: "https://hub.unido.org/sites/default/files/logos/ifad_0.png",
    bg: "bg-lime-50",
  },
  {
    id: 8,
    name: "AgriTech BD",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4BSdv1z2yKWSRsrHZG-ARWr3kURfxpEPGaQ&s",
    bg: "bg-green-50",
  },
  {
    id: 9,
    name: "Krishi Hub",
    logo: "https://img.freepik.com/premium-vector/agro-farm-green-logo-template_624194-931.jpg?semt=ais_hybrid&w=740&q=80",
    bg: "bg-yellow-50",
  },
  {
    id: 10,
    name: "FarmLink Global",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SttKBXfcbND1nwya1Wx4lny4KOakJfypmQ&s",
    bg: "bg-green-100",
  },
  {
    id: 11,
    name: "BARI",
    logo: "https://images-platform.99static.com/2ILFyC2qxM58EeK6_q2lwEEigKk=/500x500/top/smart/99designs-contests-attachments/23/23331/attachment_23331960",
    bg: "bg-red-50",
  },
  {
    id: 12,
    name: "ACI Agri", //
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-vQuwdfwNYz42gstmadBclOqpXpgbwoo1g&s",
    bg: "bg-white-50",
  },
];

const PartnerShips = () => {
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section
      className="bg-[var(--color-bg)] relative overflow-hidden"
      id="partnerships"
    >
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2">
          Our Trusted Partners
        </h2>
        <p className="text-[var(--color-muted)] text-sm sm:text-base">
          Collaborating with leading organizations to empower farmers worldwide
        </p>
      </div>

      {/* Smooth infinite horizontal scroll */}
      <div className="overflow-hidden relative w-[90%] mx-auto">
        <div className="flex items-center animate-scroll-horizontal">
          {scrollingPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={`shrink-0 mx-3 flex items-center justify-center 
                rounded-full shadow-md hover:scale-105 transition-transform duration-300 my-3
                bg-[var(--color-surface)] border border-[var(--color-border)]
                hover:border-[var(--color-accent)]`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-30 lg:w-45 object-contain rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerShips;
