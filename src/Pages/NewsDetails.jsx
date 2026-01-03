import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const mockNews = [
  {
    id: 1,
    title: "Organic Farming Takes Root",
    category: "Sustainability",
    date: "Oct 25, 2025",
    author: "Rafi Ahmed",
    content: `
      The rise of organic farming across Bangladesh and beyond marks a turning point in agricultural sustainability.
      More farmers are choosing to move away from chemical pesticides and fertilizers, instead focusing on compost,
      biological pest control, and crop rotation.

      This not only improves soil health but also ensures safer food for consumers. With government incentives and
      local cooperatives helping farmers transition, the adoption rate of organic methods has risen by over 30% in
      the past two years.

      As demand grows for organic produce, the market is also responding — with fair pricing and wider export
      opportunities emerging for eco-conscious growers.
    `,
    img: "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg",
  },
  {
    id: 2,
    title: "Smart Irrigation Boosts Yields",
    category: "Innovation",
    date: "Oct 20, 2025",
    author: "Sadia Islam",
    content: `
      Smart irrigation systems are transforming traditional farming by integrating IoT sensors and weather-based data.
      Farmers can now monitor soil moisture, temperature, and humidity remotely, adjusting water usage in real-time.

      This technology saves up to 40% of water while increasing overall productivity. As part of digital agriculture
      initiatives, these systems are becoming more affordable and accessible for rural farmers, ensuring both
      environmental and economic benefits.
    `,
    img: "https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg",
  },
  {
    id: "3",
    title: "Farmer-to-Market Connections",
    category: "Economy",
    date: "Oct 10, 2025",
    author: "Tanvir Rahman",
    content: `
      In many rural areas, farmers often face challenges selling their produce at fair prices due to multiple middlemen.
      However, direct farmer-to-market connections are now reshaping the agricultural economy. 

      Through online marketplaces, local cooperatives, and mobile-based trade apps, farmers can now reach buyers directly,
      negotiate fair deals, and reduce post-harvest losses. This change not only increases income but also strengthens
      community networks.

      Governments and startups are working hand in hand to build digital infrastructure for rural markets — ensuring
      small-scale farmers can thrive in a transparent, competitive environment. The results are clear: higher profit
      margins, fresher produce, and happier customers.
    `,
    img: "https://images.pexels.com/photos/3531895/pexels-photo-3531895.jpeg",
  },
  {
    id: "4",
    title: "Women Empowering Agri-Tech",
    category: "Community",
    date: "Oct 6, 2025",
    author: "Meherun Nahar",
    content: `
      Across Bangladesh and South Asia, women are stepping into leadership roles within the agricultural technology space.
      From running digital seed banks to managing precision farming startups, their impact is visible and inspiring.

      These women-led initiatives focus on providing access to micro-loans, smart tools, and educational programs that 
      teach sustainable practices. Beyond business, they’re building inclusive communities that value gender equity and 
      social empowerment.

      As a result, rural families are witnessing improved financial stability and broader participation in innovation.
      This transformation proves that empowering women in agriculture is not just social progress — it’s smart economics.
    `,
    img: "https://images.pexels.com/photos/7299964/pexels-photo-7299964.jpeg",
  },
  {
    id: "5",
    title: "Youth Returning to Farming",
    category: "Lifestyle",
    date: "Sep 30, 2025",
    author: "Rakib Hossain",
    content: `
      After years of urban migration, a growing number of young people are returning to their roots — literally.
      Modern farming is no longer viewed as a low-income, outdated profession but as a dynamic, tech-enabled career path.

      Many graduates are investing in agri-tech ventures, hydroponic setups, and organic farming operations that merge
      sustainability with entrepreneurship. These youth-driven efforts are revitalizing rural communities and creating
      new jobs.

      With access to training, funding, and mentorship, young farmers are becoming the backbone of a new agricultural era
      — one that’s innovative, resilient, and proud.
    `,
    img: "https://images.pexels.com/photos/5529950/pexels-photo-5529950.jpeg",
  },
  {
    id: "6",
    title: "Greenhouse Revolution in Bangladesh",
    category: "Innovation",
    date: "Sep 20, 2025",
    author: "Sabbir Hasan",
    content: `
      The greenhouse revolution is rapidly transforming how Bangladeshi farmers grow crops. Using controlled environments
      with temperature, humidity, and light regulation, they can now cultivate vegetables and fruits year-round.

      This innovation helps overcome unpredictable weather and ensures stable income, especially for small-scale farmers.
      In regions like Gazipur and Bogura, greenhouse farming has boosted yields by over 200% compared to traditional methods.

      Combined with solar energy and smart sensors, these setups are paving the way for sustainable, high-efficiency
      agriculture. The future of food security in Bangladesh is looking greener — quite literally.
    `,
    img: "https://images.pexels.com/photos/5877988/pexels-photo-5877988.jpeg",
  },
];

const NewsDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const found = mockNews.find((item) => item.id == id);
    setArticle(found);
  }, [id]);

  function handleShare() {
    const shareData = {
      title: document.title,
      text: "Check out this article",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        // User cancelled — no action needed
      });
    } else {
      navigator.clipboard.writeText(shareData.url);
      Swal.fire("success", "Link copied to clipboard", "success");
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <p className="text-[var(--color-muted)]">Loading news details...</p>
      </div>
    );
  }

  return (
    <motion.section
      className="py-16 sm:py-20 bg-[var(--color-bg)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-5">
        {/* Back Link */}
        <Link
          onClick={() => window.history.back()}
          className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline mb-6"
        >
          ← Back to News
        </Link>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-10 border border-[var(--color-border)] bg-[var(--color-surface)]">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <span className="bg-[var(--color-primary)] text-white text-xs px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] mt-3">
            {article.title}
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            By{" "}
            <span className="text-[var(--color-secondary)]">
              {article.author}
            </span>{" "}
            • {article.date}
          </p>
        </div>

        {/* Article Content */}
        <div className="text-[var(--color-text)]/90 leading-relaxed whitespace-pre-line text-sm sm:text-[15px] md:text-base">
          {article.content}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)] flex justify-between">
          <p>© {new Date().getFullYear()} KrishiLink News</p>
          <button onClick={handleShare} className="share-btn hover:cursor-pointer">
            Share this article 🔗
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsDetails;
