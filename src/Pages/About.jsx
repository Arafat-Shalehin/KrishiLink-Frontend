import { motion } from "framer-motion";
import { Leaf, Users, Sprout, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="bg-linear-to-b from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="max-w-5xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mt-15 text-4xl md:text-5xl font-bold text-green-700 mb-4">
          About <span className="text-green-500">KrishiLink</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Empowering farmers and buyers through a transparent, digital marketplace.
          KrishiLink helps farmers showcase their crops, connect with potential buyers,
          and manage interests — all in one easy-to-use platform.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="https://images.pexels.com/photos/2176712/pexels-photo-2176712.jpeg"
          alt="Farmers working"
          className="rounded-2xl shadow-lg w-full h-80 object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is simple — to bridge the gap between farmers and buyers
            through a transparent, fair, and sustainable system. By digitizing
            agriculture trade, we empower local producers to reach a broader
            audience, showcase their hard work, and receive the value they truly deserve.
          </p>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        className="bg-green-50 py-16 mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-10">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <Leaf className="mx-auto text-green-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Easy Crop Listing
              </h3>
              <p className="text-gray-600">
                Farmers can easily create and manage crop posts — with full details,
                pricing, and images, directly linked to their accounts.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <Users className="mx-auto text-green-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Transparent Interests
              </h3>
              <p className="text-gray-600">
                Buyers can send interest requests with quantities and messages, while
                farmers manage them with real-time accept/reject controls.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <Globe className="mx-auto text-green-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Connected Community
              </h3>
              <p className="text-gray-600">
                We bring together farmers, buyers, and agricultural communities under
                one platform to make food supply more accessible and sustainable.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We envision a digital agriculture ecosystem where every farmer can
            showcase their produce, every buyer can find what they need, and
            transactions are built on trust, simplicity, and sustainability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With KrishiLink, we’re not just building a platform — we’re building
            a bridge between rural effort and global opportunity.
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/943700/pexels-photo-943700.jpeg"
          alt="Agriculture field"
          className="rounded-2xl shadow-lg w-full h-80 object-cover"
        />
      </motion.section>

      {/* Team / Footer */}
      <motion.section
        className="bg-green-700 text-white py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Sprout className="mx-auto w-14 h-14 mb-4 text-green-200" />
        <h2 className="text-3xl font-semibold mb-4">Grow With Us</h2>
        <p className="max-w-2xl mx-auto text-green-100 mb-8">
          KrishiLink is more than a project — it’s a movement towards empowering
          local farmers, promoting sustainability, and creating transparent
          agricultural markets for everyone.
        </p>
      </motion.section>
    </div>
  );
};

export default About;