import { motion } from "framer-motion";
import { Link } from "react-router";

const news = [
  {
    id: 1,
    title: "Organic Farming Takes Root",
    category: "Sustainability",
    date: "Oct 25, 2025",
    desc: "More farmers are adopting eco-friendly methods to protect soil and ensure long-term yield.",
    img: "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg",
  },
  {
    id: 2,
    title: "Smart Irrigation Boosts Yields",
    category: "Innovation",
    date: "Oct 20, 2025",
    desc: "Modern IoT-based systems are helping farmers save water and improve efficiency.",
    img: "https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg",
  },
  {
    id: 3,
    title: "Farmer-to-Market Connections",
    category: "Economy",
    date: "Oct 10, 2025",
    desc: "Direct sales channels are helping rural farmers get fair prices for their produce.",
    img: "https://images.pexels.com/photos/3531895/pexels-photo-3531895.jpeg",
  },
  {
    id: 4,
    title: "Women Empowering Agri-Tech",
    category: "Community",
    date: "Oct 6, 2025",
    desc: "Rural women are embracing agri-tech startups and transforming the farming landscape.",
    img: "https://images.pexels.com/photos/7299964/pexels-photo-7299964.jpeg",
  },
  {
    id: 5,
    title: "Youth Returning to Farming",
    category: "Lifestyle",
    date: "Sep 30, 2025",
    desc: "Younger generations are seeing farming as a modern, tech-powered career choice.",
    img: "https://images.pexels.com/photos/5529950/pexels-photo-5529950.jpeg",
  },
  {
    id: 6,
    title: "Greenhouse Revolution in Bangladesh",
    category: "Innovation",
    date: "Sep 20, 2025",
    desc: "Controlled farming is enabling off-season crops and steady income for growers.",
    img: "https://images.pexels.com/photos/5877988/pexels-photo-5877988.jpeg",
  },
];

const AgroNews = () => {
  return (
    <section className="py-20 bg-white" id="agro-news">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Agro News & Insights
          </h2>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            Stay updated with the latest trends, innovations, and real stories
            shaping the future of agriculture.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-50 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{article.date}</p>
                <p className="text-gray-600 text-sm grow">{article.desc}</p>

                <Link
                  to={`/news/${article.id}`}
                  className="mt-5 text-green-700 font-medium inline-flex items-center hover:gap-2 transition-all duration-300"
                >
                  Read More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgroNews;
