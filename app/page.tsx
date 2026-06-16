import { Navigation } from "@/components/Navigation";
import { Countdown } from "@/components/Countdown";
import { RSVPForm } from "@/components/RSVPForm";
import { ScratchCard } from "@/components/ScratchCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { weddingData } from "@/data/wedding";

function Ornament() {
  return (
    <div className="lux-ornament" aria-hidden="true">
      <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
        <path d="M7 1.5C7 1.5 5.5 0 3.5 0C1.5 0 0 1.5 0 3.5C0 7 7 12.5 7 12.5C7 12.5 14 7 14 3.5C14 1.5 12.5 0 10.5 0C8.5 0 7 1.5 7 1.5Z" fill="currentColor" className="text-[var(--gold)]" />
      </svg>
    </div>
  );
}

function DetailCard({ details }: { details: readonly { label: string; value: string }[] }) {
  return (
    <div className="detail-card">
      {details.map((item, i) => (
        <div key={item.label} className="detail-card-row">
          <span className="detail-item-label">{item.label}</span>
          <span className="detail-item-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="main-content sections-stack">
        {/* ═══ HERO ═══ */}
        <section id="wedding" className="hero">
          <p className="hero-overline anim-fade-in">Holy Matrimony</p>

          <div className="anim-slide-down" style={{ animationDelay: "0.2s" }}>
            <h1 className="hero-name">{weddingData.couple.groomName}</h1>
          </div>
          <span className="hero-ampersand anim-fade-in" style={{ animationDelay: "0.4s" }}>&</span>
          <div className="anim-fade-up" style={{ animationDelay: "0.5s" }}>
            <h1 className="hero-name">{weddingData.couple.brideName}</h1>
          </div>

          <p className="hero-date anim-fade-in" style={{ animationDelay: "0.7s" }}>
            29 June 2026 &bull; Kayamkulam, Kerala
          </p>

          <div className="anim-fade-in" style={{ animationDelay: "0.9s" }}>
            <p className="lux-subtitle">{weddingData.invitation.message}</p>
          </div>

          <div className="lux-quote anim-fade-in" style={{ animationDelay: "1.1s" }}>
            <p>&ldquo;{weddingData.couple.scripture.quote}&rdquo;</p>
            <span className="lux-quote-verse">{weddingData.couple.scripture.verse}</span>
          </div>
        </section>

        {/* ═══ COUNTDOWN ═══ */}
        <RevealOnScroll>
          <section className="lux-section" style={{ textAlign: "center" }}>
            <p className="lux-overline">Counting Down To</p>
            <h2 className="lux-heading">Our Special Day</h2>
            <Ornament />
            <Countdown targetDate="2026-06-29T11:00:00+05:30" />
          </section>
        </RevealOnScroll>

        {/* ═══ FAMILIES ═══ */}
        <RevealOnScroll>
          <section className="lux-section">
            <p className="lux-overline">Our Families</p>
            <h2 className="lux-heading">With Love & Blessings</h2>
            <Ornament />
            <div className="family-grid">
              {weddingData.families.map((family) => (
                <div key={family.title} className="family-card">
                  <p className="family-card-title">{family.title}</p>
                  <p className="family-card-text">{family.details}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* ═══ DATE REVEAL ═══ */}
        <RevealOnScroll>
          <section className="lux-section" style={{ textAlign: "center" }}>
            <p className="lux-overline">A Little Surprise</p>
            <h2 className="lux-heading">{weddingData.invitation.dateRevealTitle}</h2>
            <p className="lux-subtitle">{weddingData.invitation.dateRevealHint}</p>
            <ScratchCard day={weddingData.invitation.revealDay} date={weddingData.invitation.revealDate} />
          </section>
        </RevealOnScroll>

        {/* ═══ CEREMONY ═══ */}
        <RevealOnScroll>
          <section id="ceremony" className="lux-section">
            <p className="lux-overline">The Ceremony</p>
            <h2 className="lux-heading">{weddingData.ceremony.title}</h2>
            <Ornament />
            <p className="lux-subtitle">{weddingData.ceremony.description}</p>
            <DetailCard details={weddingData.ceremony.details} />
          </section>
        </RevealOnScroll>

        {/* ═══ RECEPTION ═══ */}
        <RevealOnScroll>
          <section id="venue" className="lux-section">
            <p className="lux-overline">The Celebration</p>
            <h2 className="lux-heading">{weddingData.reception.title}</h2>
            <Ornament />
            <p className="lux-subtitle">{weddingData.reception.description}</p>
            <DetailCard details={weddingData.reception.details} />

            <div className="lux-map-frame">
              <iframe
                src={weddingData.reception.map.embedUrl}
                className="w-full h-[280px] md:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reception venue map"
              />
            </div>
            <div className="lux-map-actions">
              <a className="lux-btn" href={weddingData.reception.map.mapUrl} target="_blank" rel="noreferrer noopener">
                View Map
              </a>
              <a className="lux-btn" href={weddingData.reception.map.directionsUrl} target="_blank" rel="noreferrer noopener">
                Get Directions
              </a>
            </div>
          </section>
        </RevealOnScroll>

        {/* ═══ SECOND RECEPTION ═══ */}
        <RevealOnScroll>
          <section id="reception" className="lux-section">
            <p className="lux-overline">Kavali Celebration</p>
            <h2 className="lux-heading">{weddingData.secondReception.title}</h2>
            <Ornament />
            <p className="lux-subtitle">{weddingData.secondReception.description}</p>
            <DetailCard details={weddingData.secondReception.details} />

            <div className="lux-map-frame">
              <iframe
                src={weddingData.secondReception.map.embedUrl}
                className="w-full h-[280px] md:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Second reception venue map"
              />
            </div>
            <div className="lux-map-actions">
              <a className="lux-btn" href={weddingData.secondReception.map.mapUrl} target="_blank" rel="noreferrer noopener">
                View Map
              </a>
              <a className="lux-btn" href={weddingData.secondReception.map.directionsUrl} target="_blank" rel="noreferrer noopener">
                Get Directions
              </a>
            </div>
          </section>
        </RevealOnScroll>

        {/* ═══ RSVP ═══ */}
        <RevealOnScroll>
          <section id="rsvp" className="lux-section flex flex-col items-center" style={{ textAlign: "center" }}>
            <p className="lux-overline">Your Response</p>
            <h2 className="lux-heading">Kindly Respond</h2>
            <Ornament />
            <p className="lux-subtitle">
              Let us know whether you will be joining us. Your response helps us prepare well for the celebration.
            </p>
            <RSVPForm />
          </section>
        </RevealOnScroll>

        {/* ═══ CONTACT ═══ */}
        <RevealOnScroll>
          <section className="lux-section" style={{ textAlign: "center" }}>
            <p className="lux-overline">Get In Touch</p>
            <h2 className="lux-heading">Contact Us</h2>
            <Ornament />
            <p className="lux-subtitle">
              For any wedding details, directions, or assistance, please reach out.
            </p>
            <div className="mt-6">
              <a href={`tel:${weddingData.contact.tel}`} className="lux-btn lux-btn--gold">
                {weddingData.contact.phone}
              </a>
            </div>
          </section>
        </RevealOnScroll>

        {/* ═══ CLOSING ═══ */}
        <RevealOnScroll>
          <section className="lux-section" style={{ textAlign: "center" }}>
            <h2 className="lux-heading">With Grateful Hearts</h2>
            <Ornament />
            <p className="lux-subtitle">We look forward to sharing this sacred day with you.</p>
            <p className="mt-6 text-2xl text-[var(--gold)]" aria-hidden="true">&#10084;</p>
          </section>
        </RevealOnScroll>

        <footer className="lux-footer">
          Praneeth & Sherin &middot; 29 June 2026
        </footer>
      </main>
    </>
  );
}
