import Image from "next/image";
import { MusicPlayer } from "@/components/MusicPlayer";
import { RSVPForm } from "@/components/RSVPForm";
import { ScratchCard } from "@/components/ScratchCard";
import { weddingData } from "@/data/wedding";

function DetailCards({ details }: { details: readonly { label: string; value: string }[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {details.map((item) => (
        <div key={item.label} className="card">
          <p className="label">{item.label}</p>
          <p className="detail">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function MapSection({
  title,
  description,
  embedUrl,
  mapUrl,
  directionsUrl,
}: {
  title: string;
  description: string;
  embedUrl: string;
  mapUrl: string;
  directionsUrl: string;
}) {
  return (
    <section className="section-shell" aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`} className="heading">{title}</h2>
      <p className="description">{description}</p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-amber-200/70">
        <iframe
          src={embedUrl}
          className="h-[320px] w-full md:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${title} map`}
        />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a className="map-button" href={mapUrl} target="_blank" rel="noreferrer noopener">Open In Google Maps</a>
        <a className="map-button" href={directionsUrl} target="_blank" rel="noreferrer noopener">Get Directions</a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="page-wrap">
      <MusicPlayer src={weddingData.assets.music} />
      <section className="hero-shell">
        <p className="small-label">{weddingData.invitation.heading}</p>
        <p className="small-label mt-2">{weddingData.invitation.invitationLine}</p>
        <h1 className="hero-name">{weddingData.couple.brideName}</h1>
        <p className="ampersand">&</p>
        <h1 className="hero-name">{weddingData.couple.groomName}</h1>

        <div className="hero-image-wrap">
          <picture>
            <source srcSet="/images/couple-photo.avif" type="image/avif" />
            <source srcSet="/images/couple-photo.webp" type="image/webp" />
            <Image
              src={weddingData.couple.heroImage}
              alt={weddingData.couple.heroImageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </picture>
        </div>

        <p className="description max-w-3xl">{weddingData.invitation.message}</p>
        <blockquote className="scripture">
          “{weddingData.couple.scripture.quote}”
          <span>{weddingData.couple.scripture.verse}</span>
        </blockquote>
      </section>

      <section className="section-shell" aria-labelledby="families-heading">
        <h2 id="families-heading" className="heading">With Love From Our Families</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {weddingData.families.map((family) => (
            <article key={family.title} className="card">
              <p className="label">{family.title}</p>
              <p className="detail whitespace-pre-line">{family.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell text-center" aria-labelledby="date-heading">
        <h2 id="date-heading" className="heading">{weddingData.invitation.dateRevealTitle}</h2>
        <p className="description">{weddingData.invitation.dateRevealHint}</p>
        <ScratchCard day={weddingData.invitation.revealDay} date={weddingData.invitation.revealDate} />
      </section>

      <section className="section-shell" aria-labelledby="ceremony-heading">
        <h2 id="ceremony-heading" className="heading">{weddingData.ceremony.title}</h2>
        <p className="description">{weddingData.ceremony.description}</p>
        <DetailCards details={weddingData.ceremony.details} />
      </section>

      <section className="section-shell" aria-labelledby="reception-heading">
        <h2 id="reception-heading" className="heading">{weddingData.reception.title}</h2>
        <p className="description">{weddingData.reception.description}</p>
        <DetailCards details={weddingData.reception.details} />
      </section>

      <MapSection
        title="Reception Location"
        description="Use the map below for easy navigation to our reception venue and join us as we continue the celebration together."
        embedUrl={weddingData.reception.map.embedUrl}
        mapUrl={weddingData.reception.map.mapUrl}
        directionsUrl={weddingData.reception.map.directionsUrl}
      />

      <section className="section-shell" aria-labelledby="second-reception-heading">
        <h2 id="second-reception-heading" className="heading">{weddingData.secondReception.title}</h2>
        <p className="description">{weddingData.secondReception.description}</p>
        <DetailCards details={weddingData.secondReception.details} />
      </section>

      <MapSection
        title="Second Reception Location"
        description="Use the map below for easy navigation to our second reception venue in Kavali."
        embedUrl={weddingData.secondReception.map.embedUrl}
        mapUrl={weddingData.secondReception.map.mapUrl}
        directionsUrl={weddingData.secondReception.map.directionsUrl}
      />

      <section className="section-shell floral-panel" id="rsvp" aria-labelledby="rsvp-heading">
        <p className="label">RSVP</p>
        <h2 id="rsvp-heading" className="heading mt-2">Kindly Respond</h2>
        <p className="description">Let us know whether you will be joining us. Your response will help us prepare well for the celebration.</p>
        <RSVPForm />
      </section>

      <section className="section-shell text-center" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="heading">Contact Us</h2>
        <p className="description">For any wedding details, directions, or assistance, please contact us using the number below.</p>
        <a href={`tel:${weddingData.contact.tel}`} className="mt-6 inline-flex rounded-full border border-amber-300 px-6 py-3 text-sm tracking-[0.2em] text-rose-900">
          {weddingData.contact.phone}
        </a>
      </section>

      <section className="section-shell text-center" aria-labelledby="thanks-heading">
        <h2 id="thanks-heading" className="heading">With Grateful Hearts</h2>
        <p className="description mt-4">We look forward to sharing this sacred day with you.</p>
      </section>
    </main>
  );
}
