import { Linkedin, Twitter } from 'lucide-react';
import { ArtDecoDivider } from './ui/ArtDecoDivider';
import { landingCopy } from '@/app/data/landingCopy';

export function Footer() {
  return (
    <footer className="lobbi-footer">
      <div className="lobbi-container">
        <div className="lobbi-footer-grid">
          <div>
            <div className="lobbi-footer-brand">
              <span className="lobbi-logo-mark" aria-hidden="true">
                L
              </span>
              <span className="lobbi-footer-wordmark">Lobbi</span>
            </div>
            <p className="lobbi-footer-tagline">{landingCopy.footer.tagline}</p>
          </div>

          <div>
            <h3>{landingCopy.footer.platformHeading}</h3>
            <ul>
              {landingCopy.footer.platformLinks.map((link) => (
                <li key={link}>
                  <a href="#solution" className="lobbi-focusable">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{landingCopy.footer.companyHeading}</h3>
            <ul>
              {landingCopy.footer.companyLinks.map((link) => (
                <li key={link}>
                  <a href="#cta" className="lobbi-focusable">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{landingCopy.footer.legalHeading}</h3>
            <ul>
              {landingCopy.footer.legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="lobbi-focusable" onClick={(event) => event.preventDefault()}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ArtDecoDivider className="mt-10" />

        <div className="lobbi-footer-bottom">
          <p>{landingCopy.footer.copyright}</p>
          <div className="lobbi-footer-social">
            <a href="#" aria-label="LinkedIn" onClick={(event) => event.preventDefault()} className="lobbi-focusable">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="X" onClick={(event) => event.preventDefault()} className="lobbi-focusable">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
