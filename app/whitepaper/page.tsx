import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Shield } from "lucide-react"

export default function WhitepaperPage() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-background text-foreground font-sans selection:bg-primary/30">
            <Navigation />

            <div className="container relative py-20 max-w-5xl">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <header className="mb-24 text-center">
                    <Badge
                        variant="outline"
                        className="mb-6 border-primary/30 bg-primary/10 text-primary px-4 py-1 text-xs font-mono tracking-widest uppercase"
                    >
                        Protocol Specification v1.0.4
                    </Badge>
                    <h1 className="mb-6 text-6xl font-black tracking-tighter md:text-8xl">
                        MEMORA<span className="text-primary text-4xl align-top">®</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed font-light">
                        On-chain Behavioral Intelligence: A non-custodial framework for recognizing and incentivizing rational
                        trading behavior.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Release: January 2026</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Shield className="h-4 w-4" />
                            <span>Audit: Quantstamp Verified</span>
                        </div>
                    </div>
                </header>

                <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
                    <main className="space-y-24 prose prose-invert prose-primary max-w-none">
                        {/* 1. Abstract */}
                        <section id="abstract" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold flex items-center gap-4 border-b border-border/40 pb-4">
                                <span className="font-mono text-primary text-lg">01.</span> Abstract
                            </h2>
                            <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    In the current decentralized financial landscape, incentive mechanisms are almost exclusively aligned
                                    with capital size (TVL) or transaction frequency (Volume). This creates a structural blind spot where
                                    the <span className="text-foreground font-semibold italic">quality of on-chain behavior</span>
                                    is ignored.
                                </p>
                                <p className="bg-muted/30 border-l-4 border-primary p-6 rounded-r-lg italic text-foreground">
                                    "Memora introduces a cognitive evaluation layer for smart wallets, transforming disciplined trading
                                    patterns into a measurable and rewardable asset class."
                                </p>
                                <p>
                                    By utilizing non-custodial observation registries and deterministic scoring algorithms, Memora
                                    establishes the first "Proof of Discipline" protocol, enabling a meritocratic distribution of
                                    stablecoin rewards based on rationality, consistency, and emotional control.
                                </p>
                            </div>
                        </section>

                        {/* 2. The Behavioral Scoring Model */}
                        <section id="behavioral" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold flex items-center gap-4 border-b border-border/40 pb-4">
                                <span className="font-mono text-primary text-lg">02.</span>
                                Memora Behavioral Scoring Engine
                            </h2>

                            <p className="mt-8 text-muted-foreground text-lg">
                                Memora evaluates wallet reputation through a non-price, behavior-driven scoring
                                system. Each wallet receives a unified score (<span className="font-mono">S</span>)
                                derived from observable on-chain activity patterns rather than profit or balance.
                            </p>

                            <div className="mt-10 grid gap-8">
                                {/* CONSISTENCY */}
                                <div className="group relative p-8 rounded-2xl border border-border/40 bg-card/20 transition-all hover:bg-card/40">
                                    <h3 className="text-xl font-bold text-foreground">
                                        Consistency Score (C)
                                    </h3>
                                    <p className="mt-2 text-muted-foreground">
                                        Measures how consistently a wallet remains active over time, filtering out
                                        dormant, burst, or bot-like behavior.
                                    </p>

                                    <div className="mt-6 p-4 rounded bg-background/50 font-mono text-primary text-center">
                                        {`C = active_days / total_days × activity_stability`}
                                    </div>
                                </div>

                                {/* BEHAVIOR QUALITY */}
                                <div className="group relative p-8 rounded-2xl border border-border/40 bg-card/20 transition-all hover:bg-card/40">
                                    <h3 className="text-xl font-bold text-foreground">
                                        Behavior Quality (B)
                                    </h3>
                                    <p className="mt-2 text-muted-foreground">
                                        Evaluates transaction sanity based on frequency, value dispersion,
                                        and avoidance of spam or exploit-like patterns.
                                    </p>

                                    <div className="mt-6 p-4 rounded bg-background/50 font-mono text-secondary text-center">
                                        {`B = clamp(1 − anomaly_ratio, 0, 1)`}
                                    </div>
                                </div>

                                {/* ENGAGEMENT */}
                                <div className="group relative p-8 rounded-2xl border border-border/40 bg-card/20 transition-all hover:bg-card/40">
                                    <h3 className="text-xl font-bold text-foreground">
                                        Engagement Depth (E)
                                    </h3>
                                    <p className="mt-2 text-muted-foreground">
                                        Scores how deeply a wallet interacts with the ecosystem — including
                                        protocol diversity, contract interaction, and holding duration.
                                    </p>

                                    <div className="mt-6 p-4 rounded bg-background/50 font-mono text-emerald-400 text-center">
                                        {`E = log(protocol_count × holding_duration)`}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 rounded-2xl border border-border/40 bg-card/30">
                                <p className="text-muted-foreground text-sm">
                                    The final Memora Score is computed as a weighted combination of all behavioral
                                    vectors. Scores update dynamically as on-chain activity evolves, enabling
                                    real-time reputation tracking without relying on identity or KYC.
                                </p>

                                <div className="mt-4 p-4 rounded bg-background/60 font-mono text-center text-primary">
                                    {`S = w₁·C + w₂·B + w₃·E`}
                                </div>
                            </div>
                        </section>


                        {/* 3. Reward Distribution Mechanism */}
                        <section id="rewards" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold flex items-center gap-4 border-b border-border/40 pb-4">
                                <span className="font-mono text-primary text-lg">03.</span> Distribution Mechanism
                            </h2>
                            <div className="mt-8 space-y-6 text-muted-foreground text-lg">
                                <p>
                                    Rewards are distributed via a continuous-stream smart contract. The reward pool (P) is autonomously
                                    replenished through protocol-wide swap fees and MEV capture.
                                </p>
                                <div className="flex flex-col md:flex-row gap-6 mt-8">
                                    <Card className="flex-1 bg-primary/5 border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="text-sm uppercase tracking-widest text-primary">Eligibility</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Wallets must maintain S &gt; 75 for a minimum of 14 cycles.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="flex-1 bg-secondary/5 border-secondary/20">
                                        <CardHeader>
                                            <CardTitle className="text-sm uppercase tracking-widest text-secondary">Distribution</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">Proportional to S^2 to incentivize high-tier behavioral performance.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        {/* Technical Architecture */}
                        <section id="architecture">
                            <h2 className="text-3xl font-bold flex items-center gap-4 border-b border-border/40 pb-4">
                                <span className="font-mono text-primary text-lg">04.</span> Technical Architecture
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Memora's architecture consists of four primary smart contract modules deployed across EVM-compatible
                                    chains:
                                </p>

                                <Card className="border-border/50 bg-muted/30">
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 font-mono text-sm font-semibold text-primary">ObservationRegistry.sol</h3>
                                        <p className="text-sm leading-relaxed">
                                            Manages wallet registration, permission verification, and event logging. Implements read-only
                                            interfaces for monitoring DEX interactions, position changes, and transaction patterns without
                                            execution capabilities.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/50 bg-muted/30">
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 font-mono text-sm font-semibold text-secondary">BehavioralScorer.sol</h3>
                                        <p className="text-sm leading-relaxed">
                                            Implements deterministic scoring algorithms that evaluate consistency (temporal trading patterns),
                                            rationality (position sizing relative to portfolio), and discipline (adherence to stop-loss
                                            strategies). Scores update continuously as new data arrives.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/50 bg-muted/30">
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 font-mono text-sm font-semibold text-accent">RewardDistributor.sol</h3>
                                        <p className="text-sm leading-relaxed">
                                            Handles automated reward calculations and distributions. Integrates with protocol revenue streams
                                            to source stablecoin rewards, then allocates them proportionally based on normalized behavioral
                                            scores across all qualifying participants.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/50 bg-muted/30">
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 font-mono text-sm font-semibold text-chart-2">GovernanceModule.sol</h3>
                                        <p className="text-sm leading-relaxed">
                                            Enables decentralized parameter adjustment through token-weighted voting. Governance controls
                                            include scoring weight adjustments, reward distribution schedules, and protocol fee parameters.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="border-t border-border pt-12">
                            <h2 className="text-3xl font-bold flex items-center gap-4 border-b border-border/40 pb-4">
                                <span className="font-mono text-primary text-lg">05.</span> Conclusion
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Memora represents a fundamental shift in on-chain incentive design, moving beyond capital-centric
                                    models to reward the behavioral characteristics that drive long-term trading success. By implementing
                                    non-custodial behavioral observation and automated reward distribution, Memora creates a sustainable
                                    ecosystem where rational decision-making generates tangible value.
                                </p>
                                <p>
                                    The protocol's architecture ensures complete user control, transparent operation, and verifiable
                                    reward mechanics. As on-chain trading volumes continue expanding, Memora provides the infrastructure
                                    to recognize and incentivize the traders who approach markets with discipline and intelligence.
                                </p>
                                <p className="font-medium text-foreground">
                                    Join us in building a trading ecosystem that remembers — and rewards — behavioral excellence.
                                </p>
                            </div>
                        </section>
                    </main>

                    {/* Sticky Document Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            <nav className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="#abstract" className="text-primary hover:underline">
                                            01. Abstract
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#behavioral" className="text-muted-foreground hover:text-primary transition-colors">
                                            02. Scoring Model
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#rewards" className="text-muted-foreground hover:text-primary transition-colors">
                                            03. Distribution
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#architecture" className="text-muted-foreground hover:text-primary transition-colors">
                                            04. Architecture
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Resources</h4>
                                <div className="space-y-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start gap-2 text-xs font-mono bg-transparent"
                                    >
                                        <Download className="h-3 w-3" />
                                        whitepaper.pdf
                                    </Button>
                                    {/* <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start gap-2 text-xs font-mono bg-transparent"
                                    >
                                        <FileText className="h-3 w-3" />
                                        audit_v1.json
                                    </Button> */}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
