import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  ShieldCheck, 
  Scale, 
  MessageSquareHeart, 
  Leaf, 
  Users,
  CheckCircle,
  AlertTriangle,
  Ban
} from "lucide-react";

const CommunityGuidelines = () => {
  const coreValues = [
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Respect & Kindness",
      description: "Treat every member of our community with respect. Whether you're a farmer or buyer, everyone deserves courteous and professional communication."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Trust & Integrity",
      description: "Be honest in your listings and transactions. Accurate information builds trust and strengthens our agricultural community."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Fairness",
      description: "Price your products fairly and negotiate respectfully. We believe in creating win-win situations for both farmers and buyers."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainability",
      description: "Promote sustainable farming practices. Quality produce and eco-friendly methods benefit everyone and our planet."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Work together to build a thriving agricultural ecosystem. Share knowledge, support each other, and grow together."
    },
    {
      icon: <MessageSquareHeart className="w-6 h-6" />,
      title: "Open Communication",
      description: "Communicate clearly and respond promptly. Good communication prevents misunderstandings and builds lasting relationships."
    }
  ];

  const doList = [
    "Provide accurate information about your products, including quality, quantity, and pricing",
    "Respond to inquiries and orders within 24 hours during business days",
    "Maintain professional and respectful communication at all times",
    "Deliver products as described and within the agreed timeframe",
    "Use high-quality, authentic images that accurately represent your produce",
    "Resolve disputes calmly and professionally through our support channels",
    "Report suspicious activity or violations to help keep our community safe",
    "Follow all local agricultural and food safety regulations",
    "Honor your commitments and agreements with other community members",
    "Provide constructive feedback to help others improve"
  ];

  const dontList = [
    "Post false, misleading, or fraudulent information about products or yourself",
    "Use offensive language, harassment, or discriminatory behavior",
    "Share personal contact information before a transaction is confirmed",
    "Attempt transactions outside the platform to avoid fees (this voids buyer protection)",
    "Post spam, unsolicited promotional content, or irrelevant listings",
    "Upload inappropriate, copyrighted, or AI-generated product images",
    "Manipulate prices artificially or engage in price gouging",
    "Create multiple accounts or fake identities",
    "Share another user's private information without consent",
    "Attempt to circumvent our verification or security systems"
  ];

  const reportItems = [
    "False or misleading product listings",
    "Harassment or inappropriate behavior",
    "Fraudulent activity or suspicious payments",
    "Counterfeit or misrepresented products",
    "Spam or scam attempts",
    "Violations of food safety standards",
    "Any content that makes you feel unsafe"
  ];

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
          Community <span className="text-(--color-primary)">Guidelines</span>
        </h1>
        <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
          Our community thrives on trust, respect, and shared commitment to sustainable agriculture. These guidelines help us maintain a safe, fair, and prosperous marketplace for everyone.
        </p>
      </motion.div>

      {/* Core Values */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          className="text-2xl font-bold text-(--color-text) text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              className="bg-(--color-surface) rounded-2xl p-6 border border-(--color-border) shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-3 bg-(--color-primary)/10 rounded-xl w-fit mb-4 text-(--color-primary)">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-(--color-text) mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-(--color-muted) leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Do's */}
          <motion.div
            className="bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-border)"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="px-6 py-4 bg-green-500/10 border-b border-(--color-border) flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-700">Do's</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {doList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-(--color-text) text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Don'ts */}
          <motion.div
            className="bg-(--color-surface) rounded-2xl overflow-hidden border border-(--color-border)"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="px-6 py-4 bg-red-500/10 border-b border-(--color-border) flex items-center gap-3">
              <Ban className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-semibold text-red-700">Don'ts</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {dontList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-(--color-text) text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reporting Section */}
      <motion.div
        className="max-w-4xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="bg-(--color-surface) rounded-2xl p-8 border border-(--color-border)">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-(--color-primary)/10 rounded-xl text-(--color-primary)">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-(--color-text)">Report Concerns</h2>
          </div>
          <p className="text-(--color-muted) mb-6">
            Help us maintain a safe community by reporting any of the following:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-(--color-primary)" />
                <span className="text-(--color-text) text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-(--color-bg) rounded-xl">
            <p className="text-sm text-(--color-muted)">
              To report an issue, click the "Report" button on any listing or profile, or email us at{" "}
              <a href="mailto:trust@krishilink.com" className="text-(--color-primary) hover:underline">
                trust@krishilink.com
              </a>
              . All reports are confidential and investigated promptly.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enforcement & Consequences */}
      <motion.div
        className="max-w-4xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-gradient-to-br from-(--color-primary)/5 to-(--color-secondary)/5 rounded-2xl p-8 border border-(--color-border)">
          <h2 className="text-2xl font-bold text-(--color-text) mb-4">
            Enforcement & Consequences
          </h2>
          <p className="text-(--color-muted) mb-6">
            We take violations seriously to protect our community. Depending on the severity and frequency of violations, consequences may include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { level: "First Violation", action: "Warning & Education" },
              { level: "Repeated Violations", action: "Temporary Account Suspension" },
              { level: "Serious Violations", action: "Permanent Account Ban" }
            ].map((item, index) => (
              <div key={index} className="bg-(--color-surface) rounded-xl p-4 text-center border border-(--color-border)">
                <div className="text-sm font-semibold text-(--color-primary) mb-1">{item.level}</div>
                <div className="text-xs text-(--color-muted)">{item.action}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Updates to Guidelines */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="bg-(--color-surface) rounded-2xl p-8 border border-(--color-border)">
          <h3 className="text-xl font-semibold text-(--color-text) mb-3">
            Updates to Our Guidelines
          </h3>
          <p className="text-(--color-muted) text-sm mb-4">
            These guidelines may be updated periodically to better serve our growing community. We will notify members of significant changes via email and platform announcements.
          </p>
          <p className="text-xs text-(--color-muted)">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunityGuidelines;
