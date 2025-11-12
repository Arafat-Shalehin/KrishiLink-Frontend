import React from "react";
import { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthProvider";
import { href, Link } from "react-router";

export default function Footer() {
  const { user } = useContext(AuthContext);

  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-emerald-100 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-50"
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full bg-linear-to-r from-emerald-500 via-amber-400 to-lime-600"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Brand + CTA */}
        <section className="grid gap-3 mb-6">
          <a
            href="/"
            aria-label="KrishiLink home"
            className="inline-flex items-center gap-3 w-fit no-underline"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-900/40">
              {/* Leaf mark */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21v-7"></path>
                <path d="M12 14c0-4 3-7 7-7 0 4-3 7-7 7z"></path>
                <path d="M12 14c0-4-3-7-7-7 0 4 3 7 7 7z"></path>
              </svg>
            </span>
            <span className="font-extrabold text-xl tracking-tight">
              KrishiLink
            </span>
          </a>
          <p className="text-emerald-700 dark:text-emerald-300">
            Farmer’s Growth & Connection Platform
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/all-crops"
              className="inline-flex items-center justify-center rounded-full bg-linear-to-b from-emerald-500 to-emerald-600 px-4 py-2 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-700 transition"
            >
              Explore Crops
            </a>
            <Link
              to={
                user && user?.email
                  ? ("/add-crops")
                  : ("/auth/login")
              }
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 bg-white/70 dark:bg-emerald-900/40 px-4 py-2 font-semibold text-emerald-900 dark:text-emerald-50 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/60 transition"
            >
              Post your crop
            </Link>
          </div>
        </section>

        {/* Link Grid */}
        <nav
          aria-label="Footer"
          className="grid gap-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 p-5 sm:p-6 lg:p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <h3 className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-300 mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/explore"
                >
                  Browse crop posts
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/connect"
                >
                  Connect & collaborate
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/stories"
                >
                  Success stories
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/trends"
                >
                  Seasonal trends
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-300 mb-3">
              For Users
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/farmers"
                >
                  For Farmers
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/traders"
                >
                  For Traders
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/consumers"
                >
                  For Consumers
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/guides/get-started"
                >
                  Getting started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-300 mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/guidelines"
                >
                  Community guidelines
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/safety"
                >
                  Safety & quality tips
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/faq"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/help"
                >
                  Help center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-300 mb-3">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="mailto:hello@krishilink.app"
                >
                  hello@krishilink.app
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/partnerships"
                >
                  Partnerships
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-emerald-500"
                  href="/report"
                >
                  Report an issue
                </a>
              </li>
            </ul>

            {/* Social */}
            <div
              className="mt-3 flex items-center gap-2"
              aria-label="Social links"
            >
              <a
                href="/"
                aria-label="X (Twitter)"
                title="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="/"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="/"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="/"
                aria-label="YouTube"
                title="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </nav>

        {/* Newsletter */}
        <section aria-label="Get updates" className="grid gap-2 pt-6">
          <h4 className="text-base font-semibold">
            Get harvest updates & tips
          </h4>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-wrap gap-2"
            method="post"
          >
            <label htmlFor="kl-news-email" className="sr-only">
              Email address
            </label>
            <input
              id="kl-news-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 min-w-[220px] rounded-full border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 px-4 py-2 text-emerald-900 dark:text-emerald-50 placeholder-emerald-700/70 dark:placeholder-emerald-300/60 focus:outline-none focus:ring-4 focus:ring-emerald-300/60 dark:focus:ring-emerald-700/50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-linear-to-b from-amber-400 to-amber-500 px-4 py-2 font-semibold text-amber-950 hover:to-amber-600 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            No spam. Seasonal insights and platform updates.
          </p>
          <span
            className="text-emerald-700 dark:text-emerald-300 
          text-sm text-center mt-4"
          >
            Copyright © {year} All right reserved by KrishiLink
          </span>
        </section>
      </div>
    </footer>
  );
}
