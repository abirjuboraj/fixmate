import {
  Search,
  ClipboardList,
  Wrench,
  Wallet,
  ArrowRight,
} from "lucide-react";

// The 4-step flow required by the assignment:
// Find a Service -> Send a Request -> Technician Fixes It -> Pay After Completion
const STEPS = [
  {
    icon: Search,
    step: "Step 1",
    title: "Find a Service",
    description:
      "Browse verified repair services by category, price, and service mode to find the right expert for your device.",
  },
  {
    icon: ClipboardList,
    step: "Step 2",
    title: "Send a Request",
    description:
      "Describe the problem, share your address and preferred date, and send a repair request in under a minute.",
  },
  {
    icon: Wrench,
    step: "Step 3",
    title: "Technician Fixes It",
    description:
      "Track the job live as it moves from Accepted to In Progress — you always know what is happening.",
  },
  {
    icon: Wallet,
    step: "Step 4",
    title: "Pay After Completion",
    description:
      "Approve the finished work, then pay securely with Stripe. You never pay before the job is done.",
  },
];


export function HowItWorks() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Wrench className="h-3.5 w-3.5" />
            How It Works
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            How FixMate Works
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            From a broken device to a working one — in four simple,
            transparent steps. No surprises, no upfront payment.
          </p>
        </div>

        {/* Steps grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <div
                key={item.title}
                className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                {/* Step badge + ghost number */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-extrabold leading-none text-muted-foreground/20 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-primary">
                  {item.step}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {/* Flow arrow between steps (desktop only, hidden on the last card) */}
                {!isLast && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/50 lg:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
