// Sitewide UI-chrome strings not sourced from Sanity — navigation, footer
// scaffolding, the help widget, form labels, and breadcrumb labels. Plain
// content types (page copy, blog posts, FAQ, etc.) are localized through
// Sanity's `language` field instead; this file exists only because the
// strings below live directly in component code (React islands and
// sitewide Astro chrome), not in the CMS.
//
// DRAFT TRANSLATION: the `is` values were machine-drafted by Claude as
// part of the i18n rollout, not reviewed by a native Icelandic speaker yet.
//
// Nav/footer hrefs are locale-prefixed here (e.g. "/is/pricing") since,
// unlike labels, an English-page href on an Icelandic page is a silent bug
// (no build error, only discoverable by clicking) — see the rollout plan's
// constraint about this.

export type Locale = 'en' | 'is';

export const DEFAULT_LOCALE: Locale = 'en';

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

interface Strings {
  nav: {
    links: NavLink[];
    bookADemo: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    by: string;
    product: string;
    company: string;
    cookieSettingsLabel: string;
    cookieSettingsHref: string;
    privacyPolicyLabel: string;
    privacyPolicyHref: string;
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  helpWidget: {
    greeting: string;
    question: string;
    contactUs: string;
    getOffer: string;
    bookADemo: string;
    close: string;
    openHelp: string;
    closeHelp: string;
  };
  contactForm: {
    nameLabel: string;
    namePlaceholder: string;
    hotelNameLabel: string;
    hotelNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    requiredSrOnly: string;
    successHeading: string;
    successBody: string;
    error: string;
    sending: string;
    send: string;
  };
  pricingSignupModal: {
    nameLabel: string;
    namePlaceholder: string;
    hotelNameLabel: string;
    hotelNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    planLabel: string;
    successHeading: string;
    successBody: string;
    error: string;
    submitting: string;
    submit: string;
  };
  breadcrumbs: {
    home: string;
    aboutUs: string;
    bookingEngine: string;
    customWebsite: string;
    contactUs: string;
    pricing: string;
    blog: string;
    cookiePolicy: string;
    privacyPolicy: string;
  };
  // UI-chrome text for components that aren't page-builder/CMS-driven —
  // their surrounding headline/label copy lives directly in component
  // code, unlike the actual cards/plans/posts they render, which come from
  // Sanity. Grouped by component rather than by page since several of
  // these render on more than one page (e.g. Pricing on Home and About Us).
  sections: {
    blogHeading: string;
    blogSeoTitle: string;
    blogSeoDescription: string;
    faqHeading: string;
    storiesLabel: string;
    storiesHeading: string;
    storiesGetQuote: string;
    addOnsHeading: string;
    addOnsBody: string;
    addOnsPerMonth: string;
    pricingHeading: string;
    pricingBody: string;
    pricingDetailsLabel: string;
    comparisonFeatureHeader: string;
    comparisonIncludedAlt: string;
  };
}

export const strings: Record<Locale, Strings> = {
  en: {
    nav: {
      links: [
        { label: 'Booking engine', href: '/booking-engine', badge: 'New' },
        { label: 'Custom website', href: '/custom-hotels-website' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'About us', href: '/about-us' },
        { label: 'Resources', href: '/discover' },
        { label: 'Contact us', href: '/contact-us' },
      ],
      bookADemo: 'Book a demo',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    footer: {
      by: 'by',
      product: 'Product',
      company: 'Company',
      cookieSettingsLabel: 'Cookie Settings',
      cookieSettingsHref: '/cookie-policy',
      privacyPolicyLabel: 'Privacy Policy',
      privacyPolicyHref: '/privacy-policy',
      instagram: 'Instagram',
      facebook: 'Facebook',
      linkedin: 'LinkedIn',
    },
    helpWidget: {
      greeting: 'Hi!',
      question: 'How can we help?',
      contactUs: 'Contact us',
      getOffer: 'Get offer',
      bookADemo: 'Book a demo',
      close: 'Close',
      openHelp: 'Open help',
      closeHelp: 'Close help',
    },
    contactForm: {
      nameLabel: 'Name',
      namePlaceholder: 'Full name',
      hotelNameLabel: 'Hotel name',
      hotelNamePlaceholder: 'Hotel name',
      emailLabel: 'Email',
      emailPlaceholder: 'jon@hotel.is',
      phoneLabel: 'Phone number',
      phonePlaceholder: 'Phone number',
      messageLabel: 'Message',
      messagePlaceholder: 'Type your message here',
      requiredSrOnly: ' (required)',
      successHeading: 'Thanks for reaching out',
      successBody: "We'll get back to you shortly.",
      error: 'Something went wrong sending your message. Please try again or email us directly.',
      sending: 'Sending…',
      send: 'Send message',
    },
    pricingSignupModal: {
      nameLabel: 'Name',
      namePlaceholder: 'Full name',
      hotelNameLabel: 'Hotel name',
      hotelNamePlaceholder: 'Hotel name',
      emailLabel: 'Email',
      emailPlaceholder: 'jon@hotel.is',
      planLabel: 'Plan',
      successHeading: 'Thanks for reaching out',
      successBody: "We'll get back to you shortly.",
      error: 'Something went wrong sending your submission. Please try again or email us directly.',
      submitting: 'Submitting…',
      submit: 'Submit',
    },
    breadcrumbs: {
      home: 'Home',
      aboutUs: 'About Us',
      bookingEngine: 'Booking Engine',
      customWebsite: 'Custom Website',
      contactUs: 'Contact Us',
      pricing: 'Pricing',
      blog: 'Blog',
      cookiePolicy: 'Cookie Policy',
      privacyPolicy: 'Privacy Policy',
    },
    sections: {
      blogHeading: 'Resources',
      blogSeoTitle: 'Resources — Hitels',
      blogSeoDescription: 'Guides, news, and insights on direct bookings, hotel websites, and revenue growth from the Hitels team.',
      faqHeading: 'Frequently asked questions',
      storiesLabel: 'Customer stories',
      storiesHeading: 'Proven to increase direct revenue',
      storiesGetQuote: 'Get a quote',
      addOnsHeading: 'Optional add-ons',
      addOnsBody: 'Extend your services with these optional add-ons.',
      addOnsPerMonth: '/ month',
      pricingHeading: 'Affordable plans for every hotel',
      pricingBody:
        "Explore Hitels' flexible pricing plans, designed for hotels of all sizes. Boost direct bookings and online presence with our scalable solutions. Choose your perfect plan today!",
      pricingDetailsLabel: 'View pricing details',
      comparisonFeatureHeader: 'Feature',
      comparisonIncludedAlt: 'Included',
    },
  },
  is: {
    nav: {
      links: [
        { label: 'Bókunarvél', href: '/is/booking-engine', badge: 'Nýtt' },
        { label: 'Sérsniðinn vefur', href: '/is/custom-hotels-website' },
        { label: 'Verðskrá', href: '/is/pricing' },
        { label: 'Um okkur', href: '/is/about-us' },
        { label: 'Fræðsla', href: '/is/discover' },
        { label: 'Hafðu samband', href: '/is/contact-us' },
      ],
      bookADemo: 'Bóka kynningu',
      openMenu: 'Opna valmynd',
      closeMenu: 'Loka valmynd',
    },
    footer: {
      by: 'af',
      product: 'Vörur',
      company: 'Fyrirtæki',
      cookieSettingsLabel: 'Vefkökustillingar',
      cookieSettingsHref: '/is/cookie-policy',
      privacyPolicyLabel: 'Persónuverndarstefna',
      privacyPolicyHref: '/is/privacy-policy',
      instagram: 'Instagram',
      facebook: 'Facebook',
      linkedin: 'LinkedIn',
    },
    helpWidget: {
      greeting: 'Hæ!',
      question: 'Hvernig getum við hjálpað?',
      contactUs: 'Hafðu samband',
      getOffer: 'Fá tilboð',
      bookADemo: 'Bóka kynningu',
      close: 'Loka',
      openHelp: 'Opna hjálp',
      closeHelp: 'Loka hjálp',
    },
    contactForm: {
      nameLabel: 'Nafn',
      namePlaceholder: 'Fullt nafn',
      hotelNameLabel: 'Nafn hótels',
      hotelNamePlaceholder: 'Nafn hótels',
      emailLabel: 'Netfang',
      emailPlaceholder: 'jon@hotel.is',
      phoneLabel: 'Símanúmer',
      phonePlaceholder: 'Símanúmer',
      messageLabel: 'Skilaboð',
      messagePlaceholder: 'Skrifaðu skilaboðin þín hér',
      requiredSrOnly: ' (nauðsynlegt)',
      successHeading: 'Takk fyrir að hafa samband',
      successBody: 'Við munum svara þér fljótlega.',
      error: 'Eitthvað fór úrskeiðis við sendingu skilaboðanna. Vinsamlegast reyndu aftur eða sendu okkur tölvupóst beint.',
      sending: 'Sendi…',
      send: 'Senda skilaboð',
    },
    pricingSignupModal: {
      nameLabel: 'Nafn',
      namePlaceholder: 'Fullt nafn',
      hotelNameLabel: 'Nafn hótels',
      hotelNamePlaceholder: 'Nafn hótels',
      emailLabel: 'Netfang',
      emailPlaceholder: 'jon@hotel.is',
      planLabel: 'Áskriftarleið',
      successHeading: 'Takk fyrir að hafa samband',
      successBody: 'Við munum svara þér fljótlega.',
      error: 'Eitthvað fór úrskeiðis við sendingu. Vinsamlegast reyndu aftur eða sendu okkur tölvupóst beint.',
      submitting: 'Sendi…',
      submit: 'Senda',
    },
    breadcrumbs: {
      home: 'Heim',
      aboutUs: 'Um okkur',
      bookingEngine: 'Bókunarvél',
      customWebsite: 'Sérsniðinn vefur',
      contactUs: 'Hafðu samband',
      pricing: 'Verðskrá',
      blog: 'Fræðsla',
      cookiePolicy: 'Vefkökustefna',
      privacyPolicy: 'Persónuverndarstefna',
    },
    sections: {
      blogHeading: 'Fræðsla',
      blogSeoTitle: 'Fræðsla — Hitels',
      blogSeoDescription: 'Leiðbeiningar, fréttir og innsýn í beinar bókanir, hótelvefsíður og tekjuaukningu frá teymi Hitels.',
      faqHeading: 'Algengar spurningar',
      storiesLabel: 'Reynslusögur viðskiptavina',
      storiesHeading: 'Sannað að auka beinar tekjur',
      storiesGetQuote: 'Fá tilboð',
      addOnsHeading: 'Valfrjálsar viðbætur',
      addOnsBody: 'Auktu þjónustuframboð þitt með þessum valfrjálsu viðbótum.',
      addOnsPerMonth: '/ mánuði',
      pricingHeading: 'Á viðráðanlegu verði fyrir öll hótel',
      pricingBody:
        'Kynntu þér sveigjanlega verðskrá Hitels, hannaða fyrir hótel af öllum stærðum. Auktu beinar bókanir og stafræna sýnileika með sveigjanlegum lausnum okkar. Veldu þína fullkomnu áskriftarleið í dag!',
      pricingDetailsLabel: 'Skoða verðskrá',
      comparisonFeatureHeader: 'Eiginleiki',
      comparisonIncludedAlt: 'Innifalið',
    },
  },
};

export function getStrings(locale: string | undefined): Strings {
  return strings[locale === 'is' ? 'is' : 'en'];
}
