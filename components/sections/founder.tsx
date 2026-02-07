export function FounderSection() {
  return (
    <section id="about" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          {/* Photo placeholder */}
          <div className="relative">
            <div className="aspect-[3/4] bg-card rounded-xl border border-border/50 flex items-center justify-center overflow-hidden">
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-serif text-primary">MK</span>
                </div>
                <p className="text-xs text-muted-foreground">Dr. Michael A. Kayser</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2 leading-tight">
              Dr. Michael A. Kayser
            </h2>
            <p className="text-sm text-primary mb-6">
              DO, FACMG — Clinical Geneticist. Pattern Recognition Researcher. Builder.
            </p>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Mike Kayser has spent his career at the intersection of genetics, pediatrics, and complex system behavior. Working with medically fragile children and families navigating impossible diagnostic journeys, he recognized that the underlying pattern wasn{"'"}t in the genes or the symptoms — it was in the system dynamics.
              </p>
              <p>
                Resona OS is the clinical tool he wished existed. Built from real patient outcomes, grounded in mathematics, and designed to scale beyond any single practice.
              </p>
            </div>

            <p className="mt-8 text-xs text-muted-foreground">
              Kayser Medical PLLC &middot; Tulsa, Oklahoma
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
