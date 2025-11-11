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
    logo: "https://brac.net/images/downloads/brac-logo.jpg",
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
    logo: "https://www.un.org/sites/un2.un.org/files/field/image/world-bank-logo_0.jpg",
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7chXeXrt1ixKhphoMg-ZrG7jm_h-DP9X9SQ&s",
    bg: "bg-emerald-50",
  },
  {
    id: 7,
    name: "IFAD",
    logo: "https://www.iita.org/wp-content/uploads/2021/05/IFAD-1024x703.png",
    bg: "bg-lime-50",
  },
  {
    id: 8,
    name: "AgriTech BD",
    logo: "https://dcassetcdn.com/design_img/2394044/578653/578653_12508156_2394044_9ad445c8_image.jpg",
    bg: "bg-green-50",
  },
  {
    id: 9,
    name: "Krishi Hub",
    logo: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/mxBXDEbMKQirPEN2/3dpng-A1a52o3lRZh8JE51.png",
    bg: "bg-yellow-50",
  },
  {
    id: 10,
    name: "FarmLink Global",
    logo: "https://farmlink.eu/wp-content/uploads/2019/06/Destacada_FarmLink-1.jpg",
    bg: "bg-green-100",
  },
  {
    id: 11,
    name: "BARI",
    logo: "https://images.seeklogo.com/logo-png/48/2/ssc-bari-logo-png_seeklogo-486473.png",
    bg: "bg-red-50",
  },
  {
    id: 12,
    name: "ACI Agri",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMXva6N_hKnH9yF6IvztbOyprGrSAghS-O_g&s",
    bg: "bg-white-50",
  },
];

const PartnerShips = () => {
  const scrollingPartners = [...partners, ...partners, ...partners]; // duplicate thrice for smooth loop

  return (
    <section className="py-10 bg-white relative overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Our Trusted Partners
        </h2>
        <p className="text-gray-500">
          Collaborating with leading organizations to empower farmers worldwide
        </p>
      </div>

      {/* Smooth infinite horizontal scroll */}
      <div className="overflow-hidden relative w-[90%] mx-auto">
        <div className="flex items-center animate-scroll-horizontal">
          {scrollingPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={`shrink-0 min-w-[180px] min-h-[120px] md:min-w-[220px] 
                lg:min-w-[260px] ${partner.bg} mx-3 flex items-center 
                justify-center rounded-xl shadow-md hover:scale-105 
                transition-transform duration-300`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 md:max-h-20 object-contain rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerShips;
