import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const steps = [
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996245/pexels-photo-8287365_hj5sat.jpg",
    title: "Post Your Crops",
    desc: "Farmers upload crop details like name, price, and location to showcase what they grow.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996268/pexels-photo-1416783_l7uxp6.jpg",
    title: "Explore All Crops",
    desc: "Users browse through hundreds of fresh produce posts uploaded by farmers nationwide.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996282/pexels-photo-3771107_kzvzxg.jpg",
    title: "Filter & Search",
    desc: "Use smart filters to quickly find the type of crops you're interested in buying or collaborating on.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996294/pexels-photo-13826860_f9iuiv.jpg",
    title: "Show Interest",
    desc: "Send a request directly to the farmer, specifying your preferred quantity and message.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996312/pexels-photo-8112172_bszkhc.jpg",
    title: "Negotiate & Connect",
    desc: "Communicate easily within the platform to finalize deals and build long-term partnerships.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996331/pexels-photo-5185155_mp1tbx.jpg",
    title: "Manage Your Posts",
    desc: "Farmers can update crop details, monitor interests, and manage their listings anytime.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996342/pexels-photo-34609782_wbzknu.webp",
    title: "Track Interests",
    desc: "Users can keep track of the status of their interests — pending, accepted, or rejected.",
  },
  {
    img: "https://res.cloudinary.com/dvancaddh/image/upload/q_auto/f_auto/v1779996359/pexels-photo-7728316_nf2lem.jpg",
    title: "Grow Together",
    desc: "Build meaningful agro connections that empower growth for both farmers and buyers.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[var(--color-bg)]" id="how-it-works">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-12">
          How It Works
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            /* ── Pause autoplay while user is hovering on a slide ── */
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay, Pagination]}
          className="pb-10"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-[var(--color-surface)] rounded-2xl shadow-md hover:shadow-xl 
                transition-all duration-300 overflow-hidden h-full flex flex-col 
                border border-[var(--color-border)]
                opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-muted)] text-sm sm:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper pagination bullet styles using palette variables */}
      <style>{`
        .swiper-pagination-bullet {
          background: var(--color-muted);
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: var(--color-accent);
          opacity: 1;
        }

        /* ── fadeInUp keyframe for the slide cards.
           Used instead of Framer Motion whileInView inside SwiperSlide
           to prevent animation conflicts with Swiper's transform system. ── */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
