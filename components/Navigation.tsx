"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "The Wedding", href: "#wedding" },
    { label: "Ceremony", href: "#ceremony" },
  { label: "Reception", href: "#reception" },
  { label: "RSVP", href: "#rsvp" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("wedding");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));

    const handleScroll = () => {
      const viewportMiddle = window.scrollY + window.innerHeight / 3;

      let currentSection = sectionIds[0];
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Check if viewport middle is within this section
        if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
          currentSection = id;
          break;
        }

        // Otherwise find the closest section above viewport middle
        const distance = viewportMiddle - sectionTop;
        if (distance >= 0 && distance < minDistance) {
          minDistance = distance;
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="nav-bar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`nav-tab ${isActive ? "nav-tab--active" : ""}`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
