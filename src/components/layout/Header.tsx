import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Journal Officiel", href: "/journal" },
  { label: "Textes Officiels", href: "/textes" },
  { label: "Archives", href: "/archives" },
  { label: "À Propos", href: "/a-propos" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-header text-header-foreground sticky top-0 z-50">
      {/* Bandeau supérieur */}
      <div className="bg-primary/90 py-1">
        <div className="container mx-auto px-4">
          <p className="text-xs text-center text-primary-foreground/80">
            République Démocratique du Congo — Plateforme Officielle de Publication des Textes Juridiques
          </p>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo et titre */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">RDC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-tight">Journal Officiel</h1>
              <p className="text-xs text-header-foreground/70">République Démocratique du Congo</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded transition-colors",
                  isActive(item.href)
                    ? "bg-primary-foreground/10 text-primary-foreground"
                    : "text-header-foreground/80 hover:text-header-foreground hover:bg-primary-foreground/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Boutons d'action */}
          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-header-foreground hover:bg-primary-foreground/10">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/dashboard">
                Administration
              </Link>
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded hover:bg-primary-foreground/10 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-header border-t border-header-foreground/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded transition-colors",
                  isActive(item.href)
                    ? "bg-primary-foreground/10 text-primary-foreground"
                    : "text-header-foreground/80 hover:text-header-foreground hover:bg-primary-foreground/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-header-foreground/10" />
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-header-foreground/80 hover:text-header-foreground hover:bg-primary-foreground/5 rounded transition-colors text-center"
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Connexion
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium bg-primary-foreground text-primary rounded hover:bg-primary-foreground/90 transition-colors text-center"
            >
              Administration
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
