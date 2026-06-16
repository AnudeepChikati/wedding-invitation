export type EventDetails = {
  label: string;
  value: string;
};

export type ReceptionMap = {
  embedUrl: string;
  mapUrl: string;
  directionsUrl: string;
};

export const weddingData = {
  seo: {
    title: "Sherin & Praneeth Wedding Invitation",
    description: "Join us in celebrating our wedding and special day.",
    canonicalUrl: "https://sherin-praneeth-wedding.vercel.app",
    keywords: ["wedding invitation", "Christian wedding", "Sherin", "Praneeth"],
  },
  couple: {
    brideName: "Sherin",
    groomName: "Praneeth Wesely",
    heroImage: "/images/couple-photo.jpg",
    heroImageAlt: "Sherin and Praneeth portrait",
    scripture: {
      quote:
        "So then, they are no longer two but one flesh. Therefore, what God has joined together, let no man separate.",
      verse: "Matthew 19:6",
    },
  },
  invitation: {
    heading: "Holy Matrimony",
    invitationLine: "We Cordially Invite You To Celebrate The Wedding Of",
    message:
      "We honour your presence as they enter into the covenant of holy matrimony and celebrate the grace of God with loved ones.",
    dateRevealTitle: "Scratch to reveal our wedding date",
    dateRevealHint: "A small interaction before the celebration details unfold.",
    revealDay: "Monday",
    revealDate: "29 June 2026",
  },
  families: [
    {
      title: "Bride's Family",
      details:
        "D/O Mrs. Susan Monichan & Mr. Monichan Samuel,\nShemerin Villa, Kannel, Kayamkulam, Kerala",
    },
    {
      title: "Groom's Family",
      details:
        "S/O Mrs. Stella Jayasi & Mr. Narseejan Kumar Rondla,\n19-1-45 Kolla Farm Area, Musunur, Kavali, Andhra Pradesh",
    },
    {
      title: "Extended Blessings",
      details: "Mr. Saju P Mathew, Dr. Merin Saju, Aiden & Aldrin.",
    },
  ],
  ceremony: {
    title: "Wedding Ceremony",
    description:
      "A reverent gathering to witness vows, prayer, worship, and the beginning of a covenant before God.",
    details: [
      { label: "Time", value: "11:00 AM" },
      { label: "Venue", value: "Kadeesa Cathedral Orthodox Church" },
      { label: "Address", value: "Kayamkulam, Alappuzha Dist, Kerala" },
    ] satisfies EventDetails[],
  },
  reception: {
    title: "Wedding Reception",
    description:
      "Following the ceremony, we invite you to share in a warm reception filled with gratitude, fellowship, and joy.",
    details: [
      { label: "Time", value: "Followed by Marriage" },
      { label: "Venue", value: "Mikas Convention Centre" },
      { label: "Address", value: "K.P. Road, Murukkummoodu, Kayamkulam" },
    ] satisfies EventDetails[],
    map: {
      embedUrl: "https://www.google.com/maps?q=9.177158091990888,76.52396738465745&z=16&output=embed",
      mapUrl: "https://maps.google.com/?q=9.177158091990888,76.52396738465745",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=9.177158091990888,76.52396738465745",
    } satisfies ReceptionMap,
  },
  secondReception: {
    title: "Second Reception",
    description:
      "To celebrate this joyful occasion with our loved ones in Kavali, Andhra Pradesh, a second reception will also be hosted. We would be honoured by your presence.",
    details: [
      { label: "Time", value: "July 4th, 7:00 PM" },
      { label: "Venue", value: "RSR Kalyana Mandapam, Kavali" },
      { label: "Address", value: "Kavali, Andhra Pradesh" },
    ] satisfies EventDetails[],
    map: {
      embedUrl: "https://www.google.com/maps?q=14.8999,79.9926&z=16&output=embed",
      mapUrl: "https://maps.google.com/?q=14.8999,79.9926",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=14.8999,79.9926",
    } satisfies ReceptionMap,
  },
  contact: {
    phone: "+91 9847481646",
    tel: "+919847481646",
  },
  assets: {
    music: "/music/wedding-theme.wav",
  },
} as const;
