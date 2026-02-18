import { FireParticles, SofiaChat } from "@/components/ClientComponents";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-tamba-obsidian overflow-hidden">
      {/* Fire Particles Background */}
      <FireParticles />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-tamba-cream mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            TAMBA
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-tamba-ember/60" />
            <span className="text-tamba-ember text-sm tracking-[0.3em] uppercase">
              Las Vegas
            </span>
            <span className="h-px w-12 bg-tamba-ember/60" />
          </div>
          <p
            className="text-xl md:text-2xl text-tamba-gold/90 italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Rooted in Tradition
          </p>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl text-center text-tamba-cream/70 text-lg md:text-xl leading-relaxed mb-12">
          Contemporary Indian Fine Dining celebrating the art of live-fire
          cooking. Michelin-recognized Chef Anand Singh presents bold flavors
          through tandoor, Josper, and wok.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://sevenrooms.com/explore/tambalasvegas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-8 cta-reserve"
            style={{ borderRadius: "4px" }}
          >
            Reserve Your Table
          </a>
          <a
            href="tel:+17027987889"
            className="inline-flex items-center justify-center h-14 px-8 border border-tamba-cream/20 text-tamba-cream/80 hover:text-tamba-cream hover:border-tamba-cream/40 transition-all"
            style={{ borderRadius: "4px" }}
          >
            (702) 798-7889
          </a>
        </div>

        {/* Hours Badge */}
        <div className="mt-16 text-center">
          <p className="text-tamba-cream/50 text-sm uppercase tracking-wider mb-2">
            Open Daily
          </p>
          <p className="text-tamba-cream/80 text-lg">5:00 PM — 10:00 PM</p>
        </div>

        {/* Location */}
        <div className="mt-8 text-center">
          <p className="text-tamba-cream/40 text-sm">
            Town Square • 6671 Las Vegas Blvd South
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-tamba-ember/60"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-24 px-6 border-t border-tamba-ember/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl text-tamba-cream mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            It&apos;s Not Just a Restaurant
          </h2>
          <p
            className="text-2xl md:text-3xl text-tamba-gold italic mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            It&apos;s an Experience
          </p>
          <p className="text-tamba-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tamba reimagines contemporary Indian dining with bold flavors,
            innovative techniques, and the vibrant spirit of India. Our menu
            celebrates the art of live-fire cooking through the tandoor,
            charcoal mangal, Josper oven, and Chinese wok.
          </p>
        </div>
      </section>

      {/* Cooking Methods */}
      <section className="relative z-10 py-24 px-6 bg-tamba-charcoal/30">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-tamba-cream text-center mb-16"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Art of Fire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Tandoor",
                desc: "Traditional clay oven reaching 900°F+ for breads and tandoori items",
                icon: "🔥",
              },
              {
                name: "Josper Oven",
                desc: "Our crown jewel — enclosed charcoal oven combining intense grill + oven heat",
                icon: "🪵",
              },
              {
                name: "Charcoal Mangal",
                desc: "Traditional South Asian charcoal grill for direct live-fire cooking",
                icon: "♨️",
              },
              {
                name: "Chinese Wok",
                desc: "High-heat stir fry for the quick fury of flame",
                icon: "🥢",
              },
              {
                name: "Tawa",
                desc: "Flat iron griddle for perfect charring and searing",
                icon: "🍳",
              },
            ].map((method) => (
              <div
                key={method.name}
                className="p-6 border border-tamba-ember/20 bg-tamba-obsidian/50"
                style={{ borderRadius: "4px" }}
              >
                <span className="text-3xl mb-4 block">{method.icon}</span>
                <h3 className="text-xl text-tamba-gold font-semibold mb-2">
                  {method.name}
                </h3>
                <p className="text-tamba-cream/60 text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-tamba-cream text-center mb-16"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Three Distinct Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Dining */}
            <div
              className="p-8 border border-tamba-ember/20 bg-gradient-to-b from-tamba-charcoal/50 to-transparent"
              style={{ borderRadius: "4px" }}
            >
              <h3
                className="text-2xl text-tamba-gold mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Main Dining Room
              </h3>
              <p className="text-tamba-cream/70 text-sm leading-relaxed">
                A limited-seating, upscale dining environment featuring warm
                terracotta tones, plush bouclé chairs, rich wood tables, and an
                intimate ambiance.
              </p>
            </div>

            {/* Bar Jadu */}
            <div
              className="p-8 border border-tamba-gold/30 bg-gradient-to-b from-tamba-charcoal/50 to-transparent"
              style={{ borderRadius: "4px" }}
            >
              <h3
                className="text-2xl text-tamba-gold mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bar Jadu
              </h3>
              <p className="text-tamba-cream/70 text-sm leading-relaxed mb-4">
                A hidden, enchanting cocktail bar. Master mixologist Giuseppe
                Gonzalez crafts drinks designed to delight, surprise, and
                transport.
              </p>
              <p className="text-tamba-ember text-xs italic">
                &quot;Jadu&quot; means magic in Hindi
              </p>
            </div>

            {/* Private Dining */}
            <div
              className="p-8 border border-tamba-ember/20 bg-gradient-to-b from-tamba-charcoal/50 to-transparent"
              style={{ borderRadius: "4px" }}
            >
              <h3
                className="text-2xl text-tamba-gold mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Jadu Private Dining
              </h3>
              <p className="text-tamba-cream/70 text-sm leading-relaxed mb-4">
                An exclusive private space for VIP gatherings, corporate
                dinners, and intimate celebrations. Custom menus with Chef
                Anand.
              </p>
              <p className="text-tamba-cream/50 text-xs">
                Starting at $3,000 minimum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="relative z-10 py-24 px-6 bg-tamba-charcoal/30 border-t border-tamba-ember/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-tamba-ember text-sm tracking-[0.2em] uppercase mb-4">
            Michelin-Recognized
          </p>
          <h2
            className="text-4xl md:text-5xl text-tamba-cream mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Chef Anand Singh
          </h2>
          <p className="text-tamba-cream/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Leading Tamba&apos;s kitchen with a vision that honors tradition
            while embracing innovation. His dishes, marked with ◉ on the menu,
            represent the soul of contemporary Indian cuisine.
          </p>
          <p
            className="text-tamba-gold text-xl italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &quot;Every Bite Is a Chronicle. Every Meal, a Journey.&quot;
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-tamba-ember/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Location */}
            <div>
              <h4 className="text-tamba-gold font-semibold mb-4">Visit Us</h4>
              <p className="text-tamba-cream/60 text-sm leading-relaxed">
                6671 Las Vegas Blvd South
                <br />
                Suite A-117
                <br />
                Las Vegas, NV 89119
                <br />
                Town Square
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-tamba-gold font-semibold mb-4">Hours</h4>
              <p className="text-tamba-cream/60 text-sm">
                Monday - Sunday
                <br />
                5:00 PM - 10:00 PM
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-tamba-gold font-semibold mb-4">Contact</h4>
              <p className="text-tamba-cream/60 text-sm leading-relaxed">
                <a
                  href="tel:+17027987889"
                  className="hover:text-tamba-cream transition-colors"
                >
                  (702) 798-7889
                </a>
                <br />
                <a
                  href="mailto:info@tambalasvegas.com"
                  className="hover:text-tamba-cream transition-colors"
                >
                  info@tambalasvegas.com
                </a>
                <br />
                <a
                  href="https://instagram.com/tambalasvegas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tamba-cream transition-colors"
                >
                  @tambalasvegas
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-tamba-ember/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-tamba-cream/40 text-sm">
              © {new Date().getFullYear()} Tamba Las Vegas. All rights reserved.
            </p>
            <a
              href="https://sevenrooms.com/explore/tambalasvegas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tamba-ember hover:text-tamba-gold transition-colors text-sm font-medium"
            >
              Reserve on SevenRooms →
            </a>
          </div>
        </div>
      </footer>

      {/* Sofia Chat Widget */}
      <SofiaChat />
    </main>
  );
}
