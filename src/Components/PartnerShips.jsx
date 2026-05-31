import React from "react";

const partners = [
  {
    id: 1,
    name: "FAO",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078239/FAO_logo_odav9l.svg",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    name: "BRAC",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078195/images_dkbcri.jpg",
    bg: "bg-pink-50",
  },
  {
    id: 3,
    name: "USAID",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078289/usaid-united-states-agency-for-international-logo-png_seeklogo-306631_xqreex.png",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    name: "World Bank",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078298/world-bank-logo_sjvhmi.png",
    bg: "bg-gray-50",
  },
  {
    id: 5,
    name: "Krishi Foundation",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078333/68b821e30f34c_organisation_image-JbBKfLZDdS1939128628taFinxsoiV_ws0lma.webp",
    bg: "bg-yellow-50",
  },
  {
    id: 6,
    name: "BADC",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078358/badc-logo-png_seeklogo-408076_tt2748.png",
    bg: "bg-emerald-50",
  },
  {
    id: 7,
    name: "IFAD",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078416/ifad_0_wnuee7.png",
    bg: "bg-lime-50",
  },
  {
    id: 8,
    name: "AgriTech BD",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078426/images_w2youd.jpg",
    bg: "bg-green-50",
  },
  {
    id: 9,
    name: "Krishi Hub",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078432/agro-farm-green-logo-template_624194-931_cstuk9.avif",
    bg: "bg-yellow-50",
  },
  {
    id: 10,
    name: "FarmLink Global",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078503/images_wufbug.png",
    bg: "bg-green-100",
  },
  {
    id: 11,
    name: "BARI",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078510/attachment_23331960_qvzctr.jpg",
    bg: "bg-red-50",
  },
  {
    id: 12,
    name: "ACI Agri",
    logo: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1780078520/images_vdzhf8.png",
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
