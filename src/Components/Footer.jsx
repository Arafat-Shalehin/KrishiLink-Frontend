import React from "react";
import { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function Footer() {
  const { user } = useContext(AuthContext);

  const year = new Date().getFullYear();

  const handleSub = (e) => {
    e.preventDefault();
    Swal.fire("success", "Thank you for subscribing.", "success");
    e.target.email.value = "";
  };

  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)]"
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
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface))]">
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

          <p className="text-[var(--color-muted)]">
            Farmer’s Growth & Connection Platform
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href="/all-crops"
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
              text-white lg:px-6 px-4 py-2 rounded font-semibold
              hover:brightness-95 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Explore Crops
            </a>

            <Link
              to={user && user?.email ? "/add-crops" : "/auth/login"}
              className="inline-flex items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 font-semibold text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,var(--color-surface))] transition"
            >
              Post your crop
            </Link>
          </div>
        </section>

        {/* Link Grid */}
        <nav
          aria-label="Footer"
          className="grid gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 lg:p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/explore"
                >
                  Browse crop posts
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/connect"
                >
                  Connect & collaborate
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/stories"
                >
                  Success stories
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/trends"
                >
                  Seasonal trends
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-3">
              For Users
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/farmers"
                >
                  For Farmers
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/traders"
                >
                  For Traders
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/consumers"
                >
                  For Consumers
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/guides/get-started"
                >
                  Getting started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/guidelines"
                >
                  Community guidelines
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/safety"
                >
                  Safety & quality tips
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/faq"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/help"
                >
                  Help center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="mailto:hello@krishilink.app"
                >
                  hello@krishilink.app
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
                  href="/partnerships"
                >
                  Partnerships
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4 decoration-[var(--color-primary)]"
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface))] transition"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="/"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface))] transition"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="/"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface))] transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="/"
                aria-label="YouTube"
                title="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface))] transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </nav>

        {/* Newsletter */}
        <section aria-label="Get updates" className="grid gap-2 pt-6">
          <h4 className="text-base font-semibold text-[var(--color-text)]">
            Get harvest updates & tips
          </h4>

          <form
            onSubmit={handleSub}
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
              className="flex-1 min-w-[220px] rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
            />

            <button
              type="submit"
              className="inline-flex items-center 
              justify-center rounded-full 
              bg-[var(--color-accent)] px-4 py-2 
              font-semibold text-[var(--color-text)] 
              hover:brightness-95 transition hover:cursor-pointer"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-[var(--color-muted)]">
            No spam. Seasonal insights and platform updates.
          </p>

          <span className="text-[var(--color-muted)] text-sm text-center mt-4">
            Copyright © {year} All right reserved by KrishiLink
          </span>
        </section>
      </div>
    </footer>
  );
}
