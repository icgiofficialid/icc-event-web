import { ShieldCheck, Telescope, Users } from "lucide-react";
import { footerColumns, socialItems } from "@/components/iesf/siteData";
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";

const linkMap: Record<string, string> = {
  // Event
  "About IESF": "/about",
  // "Tracks": "/",
  "Timeline": "/registration#timeline",
  "Registration": "/#register",

  // Resources
  "Guidebook": "/guide",
  // "Certificates": "/sertifikat",
  // "Media Kit": "/media-coverage",
  "FAQ": "/faq",

  // Support
  "Contact Team": "/contact",
  "WhatsApp Help": "https://wa.me/628139905880",
  "Email Support": "mailto:iesfofficial.icgi@gmail.com",
  "Venue Info": "https://icgi.or.id/",

  // Social
  "Instagram": "https://www.instagram.com/icgi.id?igsh=MTl5OW43aHNycjA0bA==",
  "YouTube": "/",
};

const SiteFooter = () => {
  const { lang } = useLang();
  return (
    <footer className="bg-panel border-t border-border py-8 md:py-10">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] grid-cols-1">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-6xl">IESF</h1>
            {/* <p className="max-w-2xl leading-8 text-muted-foreground">
              Connect with the organizing team for registration support, institution collaboration, media requests, or event information.
            </p> */}
            <div className="flex flex-wrap gap-3">
              {socialItems.map((Icon, index) => (
                <NavLink
                  key={index}
                  to="/contact"
                  className="rounded-full border border-border bg-panel p-3 text-primary transition-transform hover:-translate-y-1"
                  aria-label="IESF social link"
                >
                  <Icon className="h-5 w-5" />
                </NavLink>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={typeof column.title === 'string' ? column.title : column.title[lang]}>
                <h3 className="text-lg text-foreground">{typeof column.title === 'string' ? column.title : column.title[lang]}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {column.links.map((link) => {
                    const linkText = typeof link === 'string' ? link : link[lang];
                    const href = linkMap[linkText] ?? "/";
                    const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("https://wa");
                    return (
                      <li key={linkText}>
                        {isExternal ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary"
                          >
                            {linkText}
                          </a>
                        ) : (
                          <NavLink to={href} className="transition-colors hover:text-primary">
                            {linkText}
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="mx-auto text-center">© International Engineering Science Fair (IESF). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;