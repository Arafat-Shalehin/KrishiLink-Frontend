import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const steps = [
  {
    img: "https://images.pexels.com/photos/8287365/pexels-photo-8287365.jpeg",
    title: "Post Your Crops",
    desc: "Farmers upload crop details like name, price, and location to showcase what they grow."
  },
  {
    img: "https://images.pexels.com/photos/1416783/pexels-photo-1416783.jpeg",
    title: "Explore All Crops",
    desc: "Users browse through hundreds of fresh produce posts uploaded by farmers nationwide."
  },
  {
    img: "https://images.pexels.com/photos/3771107/pexels-photo-3771107.jpeg",
    title: "Filter & Search",
    desc: "Use smart filters to quickly find the type of crops you’re interested in buying or collaborating on."
  },
  {
    img: "https://images.pexels.com/photos/13826860/pexels-photo-13826860.jpeg",
    title: "Show Interest",
    desc: "Send a request directly to the farmer, specifying your preferred quantity and message."
  },
  {
    img: "https://images.pexels.com/photos/8112172/pexels-photo-8112172.jpeg",
    title: "Negotiate & Connect",
    desc: "Communicate easily within the platform to finalize deals and build long-term partnerships."
  },
  {
    img: "https://images.pexels.com/photos/5185155/pexels-photo-5185155.jpeg",
    title: "Manage Your Posts",
    desc: "Farmers can update crop details, monitor interests, and manage their listings anytime."
  },
  {
    img: "https://images.pexels.com/photos/34609782/pexels-photo-34609782.jpeg",
    title: "Track Interests",
    desc: "Users can keep track of the status of their interests — pending, accepted, or rejected."
  },
  {
    img: "https://images.pexels.com/photos/7728316/pexels-photo-7728316.jpeg",
    title: "Grow Together",
    desc: "Build meaningful agro connections that empower growth for both farmers and buyers."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-green-50" id="how-it-works">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12">
          How It Works
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // 👈 pauses when user hovers
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
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HowItWorks;