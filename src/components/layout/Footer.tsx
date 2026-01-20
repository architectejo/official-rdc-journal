import { Link } from "react-router-dom";

const footerLinks = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Journal Officiel", href: "/journal" },
    { label: "Textes Officiels", href: "/textes" },
    { label: "Archives", href: "/archives" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "Accessibilité", href: "/accessibilite" },
  ],
  contact: [
    { label: "À Propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bloc identité */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-footer-foreground rounded-full flex items-center justify-center">
                <span className="text-footer font-bold text-sm">RDC</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Journal Officiel</h3>
                <p className="text-xs text-footer-foreground/70">RDC</p>
              </div>
            </div>
            <p className="text-sm text-footer-foreground/80 leading-relaxed">
              Plateforme officielle de publication des lois, décrets, arrêtés et actes
              réglementaires de la République Démocratique du Congo.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-footer-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Informations</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-footer-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-footer-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-footer-foreground/10">
              <p className="text-xs text-footer-foreground/60">
                Kinshasa, République Démocratique du Congo
              </p>
            </div>
          </div>
        </div>

        {/* Barre de copyright */}
        <div className="mt-12 pt-6 border-t border-footer-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-footer-foreground/60 text-center md:text-left">
              © {currentYear} Journal Officiel de la République Démocratique du Congo.
              Tous droits réservés.
            </p>
            <p className="text-xs text-footer-foreground/60">
              République Démocratique du Congo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
