// // import type React from "react";
// // import type { Metadata } from "next";
// // import Link from "next/link";
// // import { useRouter } from "next/router";
// // import { Inter } from "next/font/google";

// // export const Header = () => {
// //   return (
// //     <div>
// //       <Link legacyBehavior prefetch={false} href="/">
// //         <a title="Home Page">
// //           <img
// //             src="./logo-full.svg"
// //             alt="header-logo"
// //             width={198}
// //             height={36}
// //             title="header-logo"
// //           />
// //         </a>
// //       </Link>
// //     </div>
// //   );
// // };
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// export const Header = () => {
//   const pathname = usePathname();

//   const isDesktop = true;
//   const isAnimating = false;
//   const isDarkHeader = false;
//   const isDarkPage = false;
//   const homepageVariant = "";
//   const currentURL = "/";
//   const primaryButtonLink = "/signup";
//   const secondaryButtonLink = "/login";

//   const addUTMParameters = (
//     url: string,
//     source: string,
//     currentUrl: string,
//     hasVariant: boolean,
//     variant: string
//   ) => {
//     return `${url}?utm_source=${source}&utm_content=header&utm_term=${currentUrl}${
//       hasVariant ? `&variant=${variant}` : ""
//     }`;
//   };

//   const isHome = pathname === "/";

//   return (
//     <div className="flex justify-between items-center p-4 border-b border-gray-200">
//       <Link href="/" prefetch={false}>
//         <Image src="/logo-full.svg" alt="header-logo" width={198} height={36} />
//       </Link>

//       <ul className="flex gap-4 items-center">
//         {/* Login */}
//         <li className="flex items-center p-0">
//           <Link
//             href={
//               isHome && isDesktop && isAnimating
//                 ? addUTMParameters(
//                     secondaryButtonLink,
//                     "nav-2",
//                     currentURL,
//                     !!homepageVariant,
//                     homepageVariant
//                   )
//                 : `https://manage.mailmodo.com/auth/login?utm_content=login&utm_term=${currentURL}`
//             }
//             prefetch={false}
//           >
//             <button
//               className="flex items-center gap-1"
//               id="nav-login-button"
//               data-theme-dark={isDarkHeader.toString()}
//               data-is-dark-page={isDarkPage.toString()}
//             >
//               {!isHome && (
//                 <Image
//                   src="https://res.cloudinary.com/mailmodo/image/upload/v1667737265/strapi/user_icon_3_3c06e6106e.png"
//                   alt="user icon"
//                   width={14}
//                   height={14}
//                 />
//               )}
//               <span>
//                 {isHome && isDesktop && isAnimating ? "Book a Demo" : "Login"}
//               </span>
//             </button>
//           </Link>
//         </li>

//         {/* Signup */}
//         <li className="flex items-center p-0">
//           <Link
//             href={addUTMParameters(
//               primaryButtonLink,
//               isHome && isDesktop && isAnimating ? "nav-2" : "nav",
//               currentURL,
//               !!homepageVariant,
//               homepageVariant
//             )}
//             prefetch={false}
//           >
//             <button
//               id="nav-signup-button"
//               className="bg-primary text-white rounded px-4 py-2"
//               data-theme-dark={isDarkHeader.toString()}
//               data-is-dark-page={isDarkPage.toString()}
//               data-is-studio-page={pathname.startsWith("/studio/").toString()}
//             >
//               {[
//                 "/",
//                 "/studio/",
//                 "/pricing/",
//                 "/features/",
//                 "/industries/",
//                 "/interactive-email-library/",
//                 "/case-studies/",
//               ].includes(pathname) ? (
//                 pathname.startsWith("/studio/") ? (
//                   "Book a Demo"
//                 ) : (
//                   <>
//                     Get started - <span>it's free</span>
//                   </>
//                 )
//               ) : (
//                 "Try Mailmodo for free"
//               )}
//             </button>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();

  const isDesktop = true;
  const isAnimating = false;
  const isDarkHeader = false;
  const isDarkPage = false;
  const homepageVariant = "";
  const currentURL = "/";
  const primaryButtonLink = "/signup";
  const secondaryButtonLink = "/login";

  const addUTMParameters = (
    url: string,
    source: string,
    currentUrl: string,
    hasVariant: boolean,
    variant: string
  ) => {
    // return `${url}?utm_source=${source}&utm_content=header&utm_term=${currentUrl}$
    //   {hasVariant ? `&variant=${variant}` : ""}`;
    return `${url}?utm_source=${source}&utm_content=header&utm_term=${currentUrl}${
      hasVariant ? `&variant=${variant}` : ""
    }`;
  };

  const isHome = pathname === "/";

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <Link href="/" prefetch={false} style={{ marginLeft: "200px" }}>
        <Image src="/logo-full.svg" alt="header-logo" width={198} height={36} />
      </Link>
      <div style={{ paddingRight: "200px" }}>
        <ul className="flex gap-4 items-center  ">
          {/* Login */}
          <li className="flex items-center p-0 ">
            <Link
              href={
                isHome && isDesktop && isAnimating
                  ? addUTMParameters(
                      secondaryButtonLink,
                      "nav-2",
                      currentURL,
                      !!homepageVariant,
                      homepageVariant
                    )
                  : `https://manage.mailmodo.com/auth/login?utm_content=login&utm_term=${currentURL}`
              }
              prefetch={false}
            >
              <button
                className="flex items-center gap-1 "
                //className="flex items-center gap-1 px-3 py-2 rounded-md bg-white shadow-[inset_0_6px_12px_0_rgba(255,255,255,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.2)]"
                id="nav-login-button"
                data-theme-dark={isDarkHeader.toString()}
                data-is-dark-page={isDarkPage.toString()}
              >
                {
                  <Image
                    src="https://res.cloudinary.com/mailmodo/image/upload/v1667737265/strapi/user_icon_3_3c06e6106e.png"
                    alt="user icon"
                    width={14}
                    height={14}
                  />
                }
                <span>
                  {isHome && isDesktop && isAnimating ? "Book a Demo" : "Login"}
                </span>
              </button>
            </Link>
          </li>
          {/* Signup */}
          <li className="flex items-center p-0">
            <Link
              href={addUTMParameters(
                primaryButtonLink,
                isHome && isDesktop && isAnimating ? "nav-2" : "nav",
                currentURL,
                !!homepageVariant,
                homepageVariant
              )}
              prefetch={false}
            >
              <button
                id="nav-signup-button"
                className="bg-[#5a45fe] text-white rounded px-4 py-2"
                data-theme-dark={isDarkHeader.toString()}
                data-is-dark-page={isDarkPage.toString()}
                data-is-studio-page={pathname.startsWith("/studio/").toString()}
              >
                {[
                  "/",
                  "/studio/",
                  "/pricing/",
                  "/features/",
                  "/industries/",
                  "/interactive-email-library/",
                  "/case-studies/",
                ].includes(pathname) ? (
                  pathname.startsWith("/studio/") ? (
                    "Book a Demo"
                  ) : (
                    <>
                      Get started - <span>it's free</span>
                    </>
                  )
                ) : (
                  // "Try Mailmodo for free"
                  <>
                    Get started - <span>it's free</span>
                  </>
                )}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
