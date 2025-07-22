import React from "react";
import { Link } from "react-router";
import { FaRegHeart, FaFacebook, FaInstagram } from "react-icons/fa";
import useAuth from "../../Hook/useAuth";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();

  return (
    <footer className="bg-white dark:bg-dark-secondary border-t border-secondary/20 dark:border-dark-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FaRegHeart className="text-3xl text-accent" />
              <span className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
                Soulmate
              </span>
            </Link>
            <p className="text-txt/70 dark:text-dark-text-muted text-sm max-w-xs">
              We help Muslims find suitable life partners with trust and
              dignity.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-secondary text-lg font-semibold text-txt dark:text-dark-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-txt/80 dark:text-dark-text-muted">
              <li>
                <Link
                  to="/"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/biodatas"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  All Biodatas
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                {!user && (
                  <Link
                    to="/login"
                    className="hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    Login / Register
                  </Link>
                )}
              </li>
              <li>
                {user && (
                  <Link
                    to="/dashboard"
                    className="hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Column 3: Support / Legal */}
          <div>
            <h3 className="font-secondary text-lg font-semibold text-txt dark:text-dark-text mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-txt/80 dark:text-dark-text-muted">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-secondary text-lg font-semibold text-txt dark:text-dark-text mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-txt/80 dark:text-dark-text-muted">
              <li>
                <a
                  href="mailto:support@yourdomain.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  support@yourdomain.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  +880-1234-567890
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-txt/70 dark:text-dark-text-muted hover:text-accent dark:hover:text-accent transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-txt/70 dark:text-dark-text-muted hover:text-accent dark:hover:text-accent transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-secondary/20 dark:border-dark-border text-center">
          <p className="text-sm text-txt/60 dark:text-dark-text-muted">
            © {currentYear} Soulmate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
