import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Shield, Truck, CreditCard, Users } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Getting Started",
      questions: [
        {
          q: "What is KrishiLink?",
          a: "KrishiLink is a digital marketplace connecting farmers directly with buyers. We eliminate middlemen, ensuring fair prices for farmers and fresh produce for buyers. Our platform supports vegetables, fruits, grains, and more."
        },
        {
          q: "How do I create an account?",
          a: "Click 'Register' in the top right corner. You can sign up using your email, Google account, or phone number. After registration, select your role as either Farmer or Buyer to access role-specific features."
        },
        {
          q: "Is KrishiLink free to use?",
          a: "Yes! Registration and browsing are completely free. We only charge a small commission on successful transactions to maintain the platform and ensure quality service."
        }
      ]
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "For Farmers",
      questions: [
        {
          q: "How do I list my crops?",
          a: "After logging in as a Farmer, go to your Dashboard and click 'Add Crop'. Fill in details like crop name, type, quantity, price per unit, and upload quality images. Your listing will be visible to buyers immediately."
        },
        {
          q: "How do I receive payments?",
          a: "Payments are securely processed through our integrated payment system. Once a buyer confirms receipt of produce, funds are transferred directly to your registered bank account or mobile wallet within 24-48 hours."
        },
        {
          q: "Can I edit or remove my listings?",
          a: "Yes! Visit your Dashboard's 'My Crops' section to manage all your listings. You can edit details, update prices, mark items as sold, or remove listings anytime."
        }
      ]
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "For Buyers",
      questions: [
        {
          q: "How do I find crops near me?",
          a: "Use our search filters on the 'All Crops' page. You can filter by location, crop type, price range, and availability. The map view shows nearby farmers for local pickup options."
        },
        {
          q: "How does the interest system work?",
          a: "Found something you like? Click 'Show Interest' on any crop listing. The farmer will be notified and can accept or decline your request. Once accepted, you can proceed with payment and arrange delivery or pickup."
        },
        {
          q: "What if the produce quality doesn't match the listing?",
          a: "We have a dispute resolution system. If quality issues arise, contact our support within 24 hours of delivery. We investigate all claims and facilitate refunds or replacements when necessary."
        }
      ]
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payments & Orders",
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept mobile banking (bKash, Nagad, Rocket), credit/debit cards, and bank transfers. All transactions are encrypted and secure. Cash on delivery is available for select local transactions."
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use SSL encryption and comply with PCI DSS standards. Your financial data is never stored on our servers; it's processed securely through our payment partners."
        },
        {
          q: "Can I cancel an order?",
          a: "Orders can be cancelled before the farmer confirms and ships the produce. Once shipped, cancellations are handled case-by-case. Check your order status in the 'My Interests' or 'My Purchases' section."
        }
      ]
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Trust & Safety",
      questions: [
        {
          q: "How does KrishiLink verify farmers?",
          a: "We verify farmers through multiple steps: phone verification, address confirmation, and optional field visits for premium sellers. Verified farmers receive a badge on their profile."
        },
        {
          q: "What if I encounter a fraudulent user?",
          a: "Report suspicious activity immediately through the 'Report' button on any profile or listing. Our team investigates within 24 hours and takes appropriate action, including account suspension if needed."
        },
        {
          q: "Is my personal information safe?",
          a: "Yes. We never share your contact details without consent. All initial communication happens through our secure messaging system. You choose when to share direct contact information."
        }
      ]
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Support",
      questions: [
        {
          q: "How do I contact customer support?",
          a: "You can reach us through: (1) Live chat on our website, (2) Email at support@krishilink.com, (3) Phone at 017XX-XXXXXX (9 AM - 6 PM, Sun-Thu), or (4) The contact form on our About page."
        },
        {
          q: "What are your support hours?",
          a: "Our customer support team is available Sunday to Thursday, 9:00 AM to 6:00 PM. For urgent issues outside these hours, please email us and we'll respond within 24 hours."
        },
        {
          q: "Where can I suggest new features?",
          a: "We love user feedback! Send feature suggestions to feedback@krishilink.com or use the 'Feedback' option in your account settings. Many of our current features came from user suggestions."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const newIndex = openIndex === `${categoryIndex}-${questionIndex}` ? null : `${categoryIndex}-${questionIndex}`;
    setOpenIndex(newIndex);
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-(--color-text) mb-4">
          Frequently Asked <span className="text-(--color-primary)">Questions</span>
        </h1>
        <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
          Find answers to common questions about using KrishiLink. Can't find what you're looking for? Contact our support team.
        </p>
      </motion.div>

      {/* FAQ Categories */}
      <div className="max-w-4xl mx-auto space-y-8">
        {faqCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            className="bg-(--color-surface) rounded-2xl shadow-sm border border-(--color-border) overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            {/* Category Header */}
            <div className="px-6 py-4 bg-(--color-primary)/5 border-b border-(--color-border) flex items-center gap-3">
              <div className="p-2 bg-(--color-primary)/10 rounded-lg text-(--color-primary)">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold text-(--color-text)">{category.title}</h2>
            </div>

            {/* Questions */}
            <div className="divide-y divide-(--color-border)">
              {category.questions.map((item, qIndex) => (
                <div key={qIndex} className="">
                  <button
                    onClick={() => toggleQuestion(catIndex, qIndex)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-(--color-bg) transition-colors"
                  >
                    <span className="font-medium text-(--color-text) pr-4">{item.q}</span>
                    <motion.div
                      animate={{ rotate: openIndex === `${catIndex}-${qIndex}` ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-(--color-muted)" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === `${catIndex}-${qIndex}` && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-(--color-muted) leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="bg-(--color-primary)/5 rounded-2xl p-8 border border-(--color-border)">
          <h3 className="text-2xl font-semibold text-(--color-text) mb-3">
            Still have questions?
          </h3>
          <p className="text-(--color-muted) mb-6">
            Can't find the answer you're looking for? Our friendly team is here to help.
          </p>
          <a
            href="mailto:support@krishilink.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-(--color-primary) text-white rounded-xl font-medium hover:brightness-95 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
