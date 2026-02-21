"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const headingContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

const headingLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1], // safe easing curve, no TS drama
    },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
};

function Reveal({ children, className = "" }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

type AppleHeadingProps = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  lines: ReactNode[];
};

function AppleHeading({ as = "h2", className = "", lines }: AppleHeadingProps) {
  const HeadingTag = as;

  return (
    <HeadingTag className={className}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={headingContainerVariants}
      >
        {lines.map((line, index) => (
          <span key={`${as}-${index}`} className="block overflow-hidden">
            <motion.span className="block will-change-transform" variants={headingLineVariants}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </HeadingTag>
  );
}

type FullBleedProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "footer";
};

function FullBleed({ children, className = "", as = "div" }: FullBleedProps) {
  const Comp = as;

  return <Comp className={`fullBleed ${className}`}>{children}</Comp>;
}

type StoryExpandImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

function StoryExpandImage({ src, alt, priority = false }: StoryExpandImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const startWidth = Math.min(1140, Math.max(viewportWidth - 48, 320));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageWidth = useTransform(scrollYProgress, [0, 1], [startWidth, viewportWidth]);
  const imageRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <FullBleed>
      <div ref={ref} className="flex justify-center overflow-hidden">
        <motion.div
          style={{ width: imageWidth, borderRadius: imageRadius }}
          className="overflow-hidden"
        >
          <Image
            src={src}
            alt={alt}
            width={2752}
            height={1536}
            className="h-auto w-full"
            priority={priority}
          />
        </motion.div>
      </div>
    </FullBleed>
  );
}

type ImageBandProps = {
  src: string;
  alt: string;
  minHeightClass: string;
  overlayClass: string;
  imageClassName?: string;
  children: ReactNode;
};

function ImageBand({
  src,
  alt,
  minHeightClass,
  overlayClass,
  imageClassName = "object-cover object-center",
  children,
}: ImageBandProps) {
  return (
    <FullBleed as="section" className={`relative overflow-hidden ${minHeightClass}`}>
      <Image src={src} alt={alt} fill className={imageClassName} />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className={`relative grid place-items-center text-center ${minHeightClass}`}>
        {children}
      </div>
    </FullBleed>
  );
}

const buttonMotion = {
  whileHover: {
    y: -2,
    boxShadow: "0 14px 28px rgba(0,0,0,0.22)",
  },
  whileTap: { scale: 0.98 },
};

const productCards = [
  {
    title: "MAI-ESSENTIAL",
    tone: "text-mai-teal",
    buttonClass: "bg-mai-teal",
    text: "MAI-ESSENTIAL is a standard handover cleaning product that covers a range of services, from dust and debris removal to final touch-up, with optional services such as shampooing and odour removal.",
  },
  {
    title: "MAI-PREMIUM",
    tone: "text-mai-blue",
    buttonClass: "bg-mai-blue",
    text: "MAI-PREMIUM is an enhanced move-in-ready product that delivers comprehensive deep cleaning and enhanced detailing.",
    extra:
      "This product covers all MAI-ESSENTIAL services, plus premium services like scrubbing, equipment cleaning, internal kitchen cabinets, odour treatment and sanitisation, and several optional services to choose from.",
  },
  {
    title: "MAI-SIGNATURE",
    tone: "text-mai-orange",
    buttonClass: "bg-mai-orange",
    text: "MAI-SIGNATURE is a premium white-glove handover product designed for luxurious properties that demand impeccable presentation.",
    extra:
      "It covers all MAI-PREMIUM plus stone polishing, hardware polishing, fine-dust extraction, and several optional add-on services.",
  },
];

const points4p = [
  {
    title: "Parentage",
    text: "Business Understanding (Parent 35 years in Contracting)",
    iconSrc: "/assets/icons/why-mai/asset-4.svg",
    iconAlt: "Parentage icon",
  },
  {
    title: "People",
    text: "Constant Training and Development",
    iconSrc: "/assets/icons/why-mai/asset-3.svg",
    iconAlt: "People icon",
  },
  {
    title: "Products",
    text: "Latest Equipment and correct consumables",
    iconSrc: "/assets/icons/why-mai/asset-2.svg",
    iconAlt: "Products icon",
  },
  {
    title: "Procedure",
    text: "Performance-Oriented Processes and Approach",
    iconSrc: "/assets/icons/why-mai/asset-1.svg",
    iconAlt: "Procedure icon",
  },
];

const clientLogos = [
  { src: "/assets/clients/logo-kotibhaskar.png", alt: "Kotibhaskar" },
  { src: "/assets/clients/logo-amar.png", alt: "Amar Builders" },
  { src: "/assets/clients/logo-solitaire.png", alt: "Solitaire" },
  { src: "/assets/clients/logo-bharati.png", alt: "Bharati Vidyapeeth" },
  { src: "/assets/clients/logo-sayaji.png", alt: "Sayaji" },
  { src: "/assets/clients/logo-archpro.png", alt: "ArchPro" },
  { src: "/assets/clients/logo-zostel.png", alt: "Zostel" },
  { src: "/assets/clients/logo-treebo.png", alt: "Treebo" },
];

const audienceCards = [
  {
    src: "/assets/images/audience-architects.png",
    alt: "Architects",
    label: "Architects",
    href: "#",
  },
  {
    src: "/assets/images/audience-interior-designers.png",
    alt: "Interior Designers",
    label: "Interior Designers",
    href: "#",
  },
  {
    src: "/assets/images/audience-property-owners.png",
    alt: "Property Owners",
    label: "Property Owners",
    href: "#",
  },
  {
    src: "/assets/images/audience-builders-promoters.png",
    alt: "Builders and Promoters",
    label: "Builders and Promoters",
    href: "#",
  },
];

export default function MaiWorldPage() {
  return (
    <div className="bg-white text-mai-text">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="container-1140 flex h-28 items-start justify-center pt-6"
        >
          <a href="#top" className="inline-flex">
            <Image
              src="/assets/logos/mai-logo-primary.png"
              alt="MAI Logo"
              width={224}
              height={114}
              className="h-auto w-[224px]"
              priority
            />
          </a>
        </nav>
      </header>

      <main id="top" className="artboard bg-white">
        <section className="mb-[88px]">
          <div className="container-1140">
            <AppleHeading
              as="h1"
              className="type-h1 main-heading text-center text-mai-heading"
              lines={["Handover-Cleaning Specialists"]}
            />
          </div>

          <StoryExpandImage
            src="/assets/images/hero-handover.webp"
            alt="Handover cleaning team in an empty home"
            priority
          />

          <div className="container-1140 pt-10">
            <Reveal>
              <p className="type-body text-center text-[#5a636d]">
                MAI (Manpower Alliance of India) specialises in handover-cleaning in
                Pune. We undertake handover cleaning for new, post-construction,
                and post-renovation properties.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mb-[88px]">
          <div className="container-1140">
            <AppleHeading
              as="h2"
              className="type-h1 main-heading text-center text-mai-heading"
              lines={["Ab Har Kona Khushnuma"]}
            />
          </div>

          <StoryExpandImage
            src="/assets/images/hero-ab-har-kona.webp"
            alt="Cleaned apartment with glass balcony"
          />

          <div className="container-1140 pt-10">
            <Reveal>
              <div className="space-y-5 text-center text-[#5a636d]">
                <p className="type-body">
                  We all know how construction dirt and furniture dust settle into
                  pores, not just on surfaces. How adhesive residue hides on glass.
                  And how stone, metal, wood finishes and fixtures require
                  different handling and careful cleaning.
                </p>
                <p className="type-body">
                  This isn&apos;t any &apos;labour&apos; job. But a service partner&apos;s
                  job who understands your work. Our parent company has been in the
                  contracting business for the past 35 years. MAI is your reliable
                  and professional service partner for handover-cleaning.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mb-[88px]">
          <div className="container-1140">
            <AppleHeading
              as="h2"
              className="type-h1 main-heading text-center text-mai-heading"
              lines={["Leaving a fresh, pleasant, and clean space", "is a memorable gesture."]}
            />
          </div>

          <StoryExpandImage
            src="/assets/images/hero-leaving-fresh.webp"
            alt="Deep cleaning a premium lobby"
          />

          <FullBleed as="section" className="bg-mai-light">
            <div className="container-1140 px-6 py-14">
              <Reveal>
                <p className="type-subhead mx-auto max-w-[910px] text-center text-[#7f8790]">
                  You have beautifully designed and built the space. It now requires
                  our cleaning service before delivery, so the owners welcome it with
                  delight.
                </p>
              </Reveal>

              <AppleHeading
                as="h3"
                className="main-heading text-center text-[29px] leading-[36px] font-bold text-mai-heading"
                lines={["MAI is hired for handover-cleaning by"]}
              />

              <Reveal>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {audienceCards.map((item) => (
                    <motion.a
                      key={item.alt}
                      href={item.href}
                      className="group relative isolate w-full cursor-pointer overflow-hidden rounded-[10px]"
                      whileHover={{ y: -2, boxShadow: "0 12px 22px rgba(0,0,0,0.18)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={544}
                          height={352}
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="block h-auto w-full"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent px-3 pb-4 pt-8">
                        <p className="text-center text-[18px] leading-[24px] font-medium text-white">
                          {item.label}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Reveal>
            </div>
          </FullBleed>
        </section>

        <section className="mb-0">
          <div className="container-1140">
            <AppleHeading
              as="h2"
              className="type-h1 main-heading text-center text-mai-heading"
              lines={["Choose the product that best suits you."]}
            />
          </div>

          <StoryExpandImage
            src="/assets/images/hero-products.webp"
            alt="House cleaning inside a premium residence"
          />
        </section>

        <FullBleed as="section" className="bg-mai-light">
          <div className="container-1140 px-6 py-12">
            <Reveal>
              <p className="type-subhead text-center text-[#7f8790]">
                We have designed and developed products tailored to our clients&apos;
                different needs.
                <br />
                Do choose what best suits your requirements.
              </p>
            </Reveal>

            <AppleHeading
              as="h2"
              className="type-h2 main-heading text-center text-mai-heading"
              lines={["Three products from MAI"]}
            />

            <Reveal>
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                {productCards.map((item) => (
                  <motion.article
                    key={item.title}
                    className="flex min-h-[560px] cursor-pointer flex-col rounded-xl border border-mai-line bg-[#f7f7f8] p-8 transition-colors"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 18px 36px rgba(0,0,0,0.14)",
                      borderColor: "rgba(17,39,58,0.25)",
                    }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <AppleHeading
                      as="h3"
                      className={`text-[24px] leading-[30px] font-bold md:text-[26px] md:leading-[32px] ${item.tone}`}
                      lines={[item.title]}
                    />
                    <div className="my-5 h-px bg-mai-line" />
                    <p className="type-body text-[#8b939c]">{item.text}</p>
                    {item.extra ? (
                      <p className="type-body mt-4 text-[#8b939c]">{item.extra}</p>
                    ) : null}

                    <motion.a
                      {...buttonMotion}
                      href="#"
                      className={`mai-cta mt-auto inline-flex h-14 w-full items-center justify-center rounded-full px-6 text-[18px] leading-[22px] font-bold !text-white hover:!text-white active:!text-white focus:!text-white ${item.buttonClass}`}
                    >
                      Request a Site Assessment
                    </motion.a>
                  </motion.article>
                ))}
              </div>
            </Reveal>
            <p className="type-small mt-6 text-center italic text-[#8a919a]">
              *t&amp;c apply
            </p>
          </div>
        </FullBleed>

        <ImageBand
          src="/assets/images/hero-cost-banner.webp"
          alt="Cost packages banner"
          minHeightClass="min-h-[420px]"
          overlayClass="bg-[rgba(5,17,28,0.53)]"
        >
          <div className="container-1140 px-6">
            <AppleHeading
              as="h2"
              className="type-h1 text-white"
              lines={[
                "Cost packages start at only",
                <span key="cost-highlight" className="text-mai-teal">
                  Rs. 10* per sq. ft.
                </span>,
              ]}
            />
            <Reveal>
              <p className="type-small mt-2 italic text-white/85">
                *Conditions apply. Costs increase based on the size, scale,
                condition of the premises, and the product selected.
              </p>
            </Reveal>
            <motion.a
              {...buttonMotion}
              href="#"
              className="mai-cta mt-6 inline-flex h-14 items-center justify-center rounded-full bg-mai-teal px-8 text-[18px] leading-[22px] font-bold !text-white hover:!text-white active:!text-white focus:!text-white"
            >
              Get a Custom Handover Estimate
            </motion.a>
          </div>
        </ImageBand>

        <FullBleed as="section" className="bg-mai-light">
          <div className="container-1140 px-6 py-16">
            <AppleHeading
              as="h2"
              className="type-h2 text-center text-mai-heading"
              lines={["Why MAI?"]}
            />
            <Reveal>
              <p className="type-subhead mt-3 text-center text-[#7f8790]">Focus on 4Ps</p>
            </Reveal>

            <Reveal>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {points4p.map((point) => {
                  return (
                    <motion.article
                      key={point.title}
                      className="group flex h-full cursor-pointer flex-col rounded-xl border border-mai-line bg-[#f7f7f8] p-6 transition-colors"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
                        borderColor: "rgba(17,39,58,0.22)",
                      }}
                      whileTap={{ scale: 0.995 }}
                    >
                      <motion.div
                        className="flex h-[60px] items-end"
                        initial={{ opacity: 0, y: 10, scale: 0.92 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                      >
                        <motion.div
                          className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105"
                          whileHover={{ rotate: -2 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <Image
                            src={point.iconSrc}
                            alt={point.iconAlt}
                            width={60}
                            height={60}
                            className="h-[60px] w-[60px] object-contain"
                          />
                        </motion.div>
                      </motion.div>
                      <AppleHeading
                        as="h3"
                        className="mt-4 text-[25px] leading-[30px] font-bold text-mai-heading"
                        lines={[point.title]}
                      />
                      <p className="type-body mt-3 text-[#7f8790]">{point.text}</p>
                    </motion.article>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </FullBleed>

        <FullBleed as="section" className="bg-white">
          <div className="container-1140 px-6 py-12">
            <AppleHeading
              as="h2"
              className="type-h2 main-heading text-center text-mai-heading"
              lines={["Sites we have served."]}
            />
            <Reveal>
              <p className="type-subhead text-center text-[#7f8790]">
                The list is growing every day.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
                {clientLogos.slice(0, 5).map((logo) => (
                  <div key={logo.alt} className="flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={230}
                      height={90}
                      className="h-auto w-auto max-w-[205px] opacity-70"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mx-auto mt-8 grid max-w-[760px] grid-cols-1 items-center gap-x-6 gap-y-8 md:grid-cols-3">
                {clientLogos.slice(5).map((logo) => (
                  <div key={logo.alt} className="flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={86}
                      className="h-auto w-auto max-w-[195px] opacity-70"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <p className="type-small mt-9 text-center italic text-[#8a919a]">
              *All logos displayed here are registered trademark of their
              respective owners.
            </p>
          </div>
        </FullBleed>

        <ImageBand
          src="/assets/images/hero-team.webp"
          alt="Team image band"
          minHeightClass="min-h-[560px] md:min-h-[640px]"
          overlayClass="bg-[rgba(7,18,30,0.48)]"
          imageClassName="object-cover object-top"
        >
          <div className="container-1140 px-6">
            <p className="text-[76px] leading-none font-normal italic tracking-[-0.02em] text-white md:text-[96px]">
              seva se hoga.
            </p>
          </div>
        </ImageBand>

        <ImageBand
          src="/assets/images/hero-housekeeping.webp"
          alt="Housekeeping banner"
          minHeightClass="min-h-[620px] md:min-h-[700px]"
          overlayClass="bg-[rgba(7,18,30,0.52)]"
        >
          <div className="container-1140 px-6">
            <AppleHeading
              as="h2"
              className="type-h1 text-white"
              lines={[
                "Reliable Everyday Housekeeping Services for Establishments in",
                "Pune",
              ]}
            />
            <motion.a
              {...buttonMotion}
              href="#"
              className="mai-cta mt-7 inline-flex h-14 items-center justify-center rounded-full bg-mai-teal px-8 text-[18px] leading-[22px] font-bold !text-white hover:!text-white active:!text-white focus:!text-white"
            >
              Explore Everyday Housekeeping
            </motion.a>
          </div>
        </ImageBand>

        <FullBleed
          as="footer"
          className="bg-[linear-gradient(180deg,#042032_0%,#021621_100%)] text-[#c5ccd3]"
        >
          <div className="container-1140 px-6 pb-8 pt-14">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <AppleHeading
                  as="h3"
                  className="text-[20px] leading-[28px] font-bold text-[#e9edf1]"
                  lines={["About MAI"]}
                />
                <p className="mt-3 text-[15px] leading-[24px]">
                  Manpower Alliance of India (MAI) is a professional, reliable,
                  and value-driven service provider of deep cleaning for handovers
                  and general housekeeping for companies. We operate in Pune and
                  its surrounding areas.
                </p>
              </div>
              <div>
                <AppleHeading
                  as="h3"
                  className="text-[20px] leading-[28px] font-bold text-[#e9edf1]"
                  lines={["Services"]}
                />
                <div className="mt-3 space-y-1 text-[15px] leading-[24px]">
                  <p>Handover cleaning</p>
                  <p>Everyday Housekeeping</p>
                </div>
              </div>
              <div>
                <AppleHeading
                  as="h3"
                  className="text-[20px] leading-[28px] font-bold text-[#e9edf1]"
                  lines={["Contact"]}
                />
                <div className="mt-3 space-y-3 text-[15px] leading-[24px]">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-1 h-5 w-5 shrink-0" />
                    <span>
                      Office 101, Plot No. 12, Shailesh Society, Next to Ashwini
                      Hospital, Off Navasahyadri, Karvenagar, Pune - 411 052
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-5 w-5 shrink-0" />
                    <span>+91-8263054306</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-5 w-5 shrink-0" />
                    <span>seva@maiworld.in</span>
                  </p>
                </div>
              </div>
              <div>
                <AppleHeading
                  as="h3"
                  className="text-[20px] leading-[28px] font-bold text-[#e9edf1]"
                  lines={["Connect"]}
                />
                <div className="mt-3 flex items-center gap-4">
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="h-7 w-7" />
                  </a>
                  <a href="#" aria-label="Facebook">
                    <Facebook className="h-7 w-7" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Instagram className="h-7 w-7" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/25 pt-7">
              <div className="flex flex-col gap-2 text-[15px] leading-[24px] lg:flex-row lg:items-center lg:justify-between">
                <p>@ 2026 Manpower Alliance of India</p>
                <p>Privacy Policy | Terms &amp; Conditions | Disclaimer</p>
              </div>
            </div>

            <p className="mt-10 text-center text-[44px] leading-none font-normal italic tracking-[-0.03em] text-white/8 md:text-[58px]">
              seva se hoga.
            </p>
          </div>
        </FullBleed>
      </main>
    </div>
  );
}
