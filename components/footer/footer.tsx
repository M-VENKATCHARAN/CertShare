// import type React from "react";
// import type { Metadata } from "next";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { Inter } from "next/font/google";
// import Image from "next/image";

// export const Footer = () => {
//   return (
//     <div>
//       <div className="flex mb-6">
//         <Image
//           src={"./logo-full.svg"}
//           alt="maidmodo logo"
//           width={198}
//           height={36}
//           //className="footer-logo"
//         />
//       </div>
//       {/* <address className={styles.company_address} data-dark-theme={isDarkPage}>
//         <p style={{ fontWeight: "600", marginBottom: "5px" }}>
//           Registered Address (US)
//         </p>
//         <p>
//           Mailmodo Technologies Inc
//           <br />
//           1160 Battery St.
//           <br />
//           East Building, Suite 100
//           <br />
//           San Francisco, CA 94111
//           {/* 355 Bryant Street, Unit 403
//                 <br />
//                 San Francisco, CA 94107
//                 <br /> USA */}
//       {/* </p> */}
//       {/* <a className="d-block" href="tel:+12626002002">
//                     +1 262 600 2002
//                   </a> */}
//       {/* //   </address> */}
//     </div>
//   );
// };
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, Fragment } from "react";

/* ───────── helpers & constants ────────── */

// ← adjust path if needed
import { HOME, PRODUCTS, RESOURCES, HOW_WE_COMPARE } from "./constants"; // ← same file you already have

const addYear = new Date().getFullYear();

/* ───────── component ────────── */

export const Footer = () => {
  const pathname = usePathname();
  const route = pathname ?? "/";

  /* ❶ Detect “dark” pages (logic copied from your SCSS version) */
  const darkPageUrlInclude =
    route.includes("/events/coming-soon/") ||
    route.includes("/ecommerce-cro/") ||
    route.includes("/tools/ai-email-campaign-planner") ||
    route.includes("/tools/ai-email-campaign-planner/") ||
    pathname?.includes("/state-of-email") ||
    pathname?.includes("/videos") ||
    pathname?.includes("/videos/series/") ||
    pathname?.includes("/videos/");
  const darkPageUrlNotInclude = !pathname?.includes("/state-of-email/[slug]");

  const [isDarkPage, setIsDarkPage] = useState(
    darkPageUrlInclude && darkPageUrlNotInclude
  );

  /* keep it reactive on route change */
  useEffect(() => {
    setIsDarkPage(darkPageUrlInclude && darkPageUrlNotInclude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  /* Tailwind colour helpers */
  const textClass = isDarkPage ? "text-neutral-100" : "text-neutral-700";
  const linkClass = isDarkPage
    ? "hover:text-white/90"
    : "hover:text-neutral-900";
  const borderClr = isDarkPage ? "border-white/20" : "border-neutral-200";

  return (
    <footer
      className={`w-full ${textClass} bg-transparent`}
      data-dark-theme={isDarkPage}
    >
      {/* ——— TOP SECTION ——— */}
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-10">
          {/* ─── Left column ─── */}
          <div className="lg:w-3/12">
            <div className="mb-6">
              <Image
                src="/logo-full.svg"
                width={198}
                height={36}
                alt="Mailmodo logo"
              />
            </div>

            {/* US address */}
            <address className="not-italic mb-6 text-sm leading-6">
              <p className="font-semibold mb-1">Registered Address&nbsp;(US)</p>
              Mailmodo Technologies Inc
              <br />
              1160&nbsp;Battery&nbsp;St.
              <br />
              East Building, Suite 100
              <br />
              San Francisco, CA 94111
            </address>

            {/* India address */}
            <address className="not-italic mb-6 text-sm leading-6">
              <p className="font-semibold mb-1">
                Registered Address&nbsp;(India)
              </p>
              Mailmodo Technologies Pvt Ltd
              <br />
              Hanto Rebel Building, 3ᵈ Floor
              <br />
              2751/492, 2ⁿᵈ Sector, HSR Layout
              <br />
              Bangalore&nbsp;560102, Karnataka
            </address>

            {/* enquiries mail */}
            <a
              href="mailto:enquiries@mailmodo.com"
              className={`block mb-6 text-sm underline ${linkClass}`}
            >
              enquiries@mailmodo.com
            </a>

            {/* social icons */}
            <div className="flex gap-4 mb-10">
              {[
                {
                  href: "https://www.linkedin.com/company/mailmodo/",
                  img: "https://res.cloudinary.com/mailmodo/image/upload/v1655820693/strapi/linkedin_a0d0166391.svg",
                  title: "LinkedIn",
                },
                {
                  href: "https://www.facebook.com/mailmodo/",
                  img: "https://res.cloudinary.com/mailmodo/image/upload/v1655820693/strapi/facebook_387512e258.svg",
                  title: "Facebook",
                },
                {
                  href: "https://www.instagram.com/mailmodohq/",
                  img: "https://res.cloudinary.com/mailmodo/image/upload/v1667825187/strapi/Instagram_Icon_b945db129c.png",
                  title: "Instagram",
                },
                {
                  href: "https://www.youtube.com/channel/UC5TnX577VlzogZj04alfnNg/featured",
                  img: "https://res.cloudinary.com/mailmodo/image/upload/v1667825189/strapi/Youtube_Icon_6734d008ca.png",
                  title: "YouTube",
                },
              ].map(({ href, img, title }) => (
                <button
                  key={title}
                  onClick={() => window.open(href, "_blank")}
                  aria-label={title}
                  className="h-8 w-8"
                >
                  <Image
                    src={img}
                    alt={`${title} logo`}
                    width={30}
                    height={30}
                  />
                </button>
              ))}
            </div>

            {/* newsletter form */}
            {/* If you already have <NewsletterForm /> component, keep using it */}
            {/* <NewsletterForm isDarkPage={isDarkPage} /> */}
          </div>

          {/* ─── Right column (link menus) ─── */}
          <div className="lg:w-9/12">
            <div
              className={`grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4`}
            >
              {/* — HOME — */}
              <div>
                <h3 className={`mb-4 font-semibold ${linkClass}`}>
                  <Link href="/">Home</Link>
                </h3>
                <ul className="space-y-2 text-sm">
                  {HOME.map((item) => (
                    <Fragment key={item.link}>
                      {item.isOnlyAnchorTag ? (
                        <li>
                          <a href={item.link} className={linkClass}>
                            {item.name}
                          </a>
                        </li>
                      ) : (
                        <li>
                          <Link
                            href={item.link}
                            target={item.target ? "_blank" : undefined}
                            className={linkClass}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>

              {/* — PRODUCT — */}
              <div>
                <h4 className={`mb-4 font-semibold ${linkClass}`}>
                  <Link href="/features/">Product</Link>
                </h4>
                <ul className="space-y-2 text-sm">
                  {PRODUCTS.map((item) => (
                    <li key={item.link}>
                      <Link href={item.link} className={linkClass}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* — RESOURCES — */}
              <div>
                <h4 className={`mb-4 font-semibold ${linkClass}`}>
                  <Link href="/resources/">Resources</Link>
                </h4>
                <ul className="space-y-2 text-sm">
                  {RESOURCES.map((item) => (
                    <li key={item.link}>
                      <Link href={item.link} className={linkClass}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* — HOW WE COMPARE — */}
              <div>
                <h4 className={`mb-4 font-semibold ${linkClass}`}>
                  <Link href="/comparison/">How We Compare</Link>
                </h4>
                <ul className="space-y-2 text-sm">
                  {HOW_WE_COMPARE.map((item) => (
                    <li key={item.link}>
                      <Link
                        href={`/comparison${item.link}`}
                        className={linkClass}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* horizontal rule */}
        <hr className={`my-12 border-t ${borderClr}`} />
      </div>

      {/* ——— BOTTOM STRIP ——— */}
      <div className="mx-auto max-w-screen-xl px-4 pb-6 flex flex-col sm:flex-row items-center justify-between text-xs opacity-70">
        <p className="mb-4 sm:mb-0">© {addYear} Mailmodo</p>
        <ul className="flex gap-4">
          {[
            ["/gdpr/termsandconditions/", "Terms of Service"],
            ["/gdpr/privacypolicy/", "Privacy Policy"],
            ["/gdpr/cookiepolicy/", "Cookie Policy"],
          ].map(([link, label]) => (
            <li key={link}>
              <Link href={link} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
