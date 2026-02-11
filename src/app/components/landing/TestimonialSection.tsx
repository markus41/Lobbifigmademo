import { LandingReveal } from './LandingReveal';
import { landingCopy } from '@/app/data/landingCopy';

export default function TestimonialSection() {
  return (
    <section id="testimonial" className="lobbi-section lobbi-section-white">
      <div className="lobbi-container lobbi-testimonial-wrap">
        <LandingReveal className="lobbi-testimonial">
          <span className="lobbi-quote-mark lobbi-quote-start" aria-hidden="true">
            "
          </span>
          <blockquote>{landingCopy.testimonial.quote}</blockquote>
          <span className="lobbi-quote-mark lobbi-quote-end" aria-hidden="true">
            "
          </span>
          <p>{landingCopy.testimonial.attribution}</p>
        </LandingReveal>
      </div>
    </section>
  );
}
