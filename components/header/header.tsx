"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoFull from "@/public/logo-full.svg"; // You may need SVGR setup for this

export const Header = () => {
  const pathname = usePathname();

  const isDesktop = true;
  const isAnimating = false;
  const homepageVariant = "";
  const currentURL = "/";
  const primaryButtonLink = "https://manage.mailmodo.com/auth/signup";
  const secondaryButtonLink = "/login";

  const addUTMParameters = (
    url: string,
    source: string,
    currentUrl: string,
    hasVariant: boolean,
    variant: string
  ) => {
    return `${url}?utm_source=${source}&utm_content=header&utm_term=${currentUrl}${
      hasVariant ? `&variant=${variant}` : ""
    }`;
  };

  const isHome = pathname === "/";

  return (
    <div className="px-1 sm:px-6 lg:px-8 py-3 flex justify-between items-center bg-[#ebf2ff]">
      {/* Logo max-w-7xl mx-auto*/}
      <Link href="/" prefetch={false} className="ml-[20px] sm:ml-[100px]">
        <Image
          src={LogoFull}
          alt="header-logo"
          width={120}
          height={28}
          priority
          className="block sm:hidden"
        />
        <Image
          src={LogoFull}
          alt="header-logo"
          width={198}
          height={36}
          className="hidden sm:block"
        />
      </Link>

      <ul className="hidden min-[800px]:flex items-center gap-4 mr-[100px]">
        {/* Login */}
        <li>
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
            <button className="flex items-center gap-2 text-sm">
              <Image
                src="https://res.cloudinary.com/mailmodo/image/upload/v1667737265/strapi/user_icon_3_3c06e6106e.png"
                alt="user icon"
                width={14}
                height={14}
              />
              <span>
                {isHome && isDesktop && isAnimating ? "Book a Demo" : "Login"}
              </span>
            </button>
          </Link>
        </li>

        {/* Signup */}
        <li>
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
            <button className="bg-[#5a45fe] text-white rounded px-4 py-2 text-sm">
              Get started - <span className="hidden md:inline">it's free</span>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
