"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";

interface DashboardData {
  status: string;
  metrics: {
    totalHeadcount: number;
    activeContracts: number;
    retentionRate: string;
    onboardingCompletion: string;
  };
  departments: Array<{
    name: string;
    count: number;
    budgetUtilization: string;
  }>;
  systemLogs: Array<{
    id: string;
    timestamp: string;
    event: string;
    type: string;
  }>;
}

const LOCAL_FALLBACK_DATA: DashboardData = {
  status: "Active Overwatch",
  metrics: {
    totalHeadcount: 1248,
    activeContracts: 1192,
    retentionRate: "94.2%",
    onboardingCompletion: "88%",
  },
  departments: [
    { name: "ENGINEERING DIVISIONs", count: 485, budgetUtilization: "82%" },
    { name: "CREATIVE & DESIGN", count: 182, budgetUtilization: "90%" },
    { name: "PEOPLE & OPERATIONS", count: 64, budgetUtilization: "75%" },
    { name: "PRODUCT MANAGEMENT", count: 115, budgetUtilization: "88%" },
    { name: "FINANCIAL INTELLIGENCE", count: 42, budgetUtilization: "95%" }
  ],
  systemLogs: [
    { id: "LOG-091", timestamp: "16:05:12", event: "Automated payroll batch executed successfully", type: "system" },
    { id: "LOG-090", timestamp: "15:42:01", event: "New employee profile created: ID-9082", type: "user" },
    { id: "LOG-089", timestamp: "14:15:30", event: "API Gateway synced with localized identity providers", type: "system" }
  ]
};

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("NestJS API offline, falling back to local Boutique mock data:", err.message);
        setData(LOCAL_FALLBACK_DATA);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>

      {/* NAVBAR */}
      <header className="mix-blend-nav" style={{ padding: "0 4rem", justifyContent: "space-between" }}>
        <div style={{ fontSize: "1.4rem", fontWeight: 600, letterSpacing: "0.1em", fontFamily: "var(--font-serif)" }}>
          AESTHETE<span style={{ fontWeight: 300, fontSize: "0.8rem", letterSpacing: "0.2em", marginLeft: "10px" }}>HRIS</span>
        </div>

        <nav style={{ display: "flex", gap: "3rem" }}>
          <a href="#about" style={{ color: "inherit", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>About</a>
          <a href="#features" style={{ color: "inherit", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Modules</a>
          <a href="#pricing" style={{ color: "inherit", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Pricing</a>
          <a href="#faq" style={{ color: "inherit", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>FAQ</a>
        </nav>

        <div>
          <a href="#pricing" className="swiss-mono" style={{ color: "inherit", textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.15em", borderBottom: "1px solid #fff", paddingBottom: "2px" }}>
            GET STARTED
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="about" style={{ paddingTop: "180px", paddingBottom: "120px", backgroundColor: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="asymmetric-grid">
            <div className="col-8" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
                THE ART OF ORGANIZATIONAL STRUCTURE
              </span>
              <h1 style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", lineHeight: 0.95, marginBottom: "2rem" }}>
                Artistic management <br />
                <i>for modern</i> enterprises.
              </h1>
              <p style={{ maxWidth: "540px", color: "var(--fg-secondary)", fontSize: "1.1rem", lineHeight: "1.7", fontWeight: 300, marginBottom: "3rem" }}>
                Aesthete reimagines the corporate workspace. Clean lines, quiet configurations, and absolute data clarity designed like a high-end architectural layout.
              </p>
              <div style={{ display: "flex", gap: "2rem" }}>
                <a href="#features" className="btn-editorial">Explore System</a>
                <a href="#pricing" className="btn-editorial-secondary">Check Pricing</a>
              </div>
            </div>

            <div className="col-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "1px solid var(--border-color)", paddingLeft: "2rem" }}>
              <div>
                <span className="serif-text" style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>Sophisticated Feed</span>
                <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)" }}>
                  Beautifully synthesized statistics running on dedicated NestJS controller pathways.
                </p>
              </div>

              {/* Minimalist Dashboard Status Card */}
              <div style={{ border: "1px solid var(--border-color)", background: "#ffffff", padding: "2rem", marginTop: "3rem" }}>
                <span className="swiss-mono" style={{ fontSize: "0.7rem", color: "var(--fg-secondary)" }}>SYSTEM MONITOR</span>
                <h4 className="serif-text" style={{ fontSize: "2rem", marginTop: "0.5rem", textTransform: "uppercase" }}>
                  {loading ? "Syncing..." : data?.status}
                </h4>
                <div style={{ width: "20px", height: "1px", backgroundColor: "var(--fg-primary)", marginTop: "1rem" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "4rem" }}>
            <div>
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>01 // Headcount</span>
              <p className="serif-text" style={{ fontSize: "3.5rem", margin: "0.5rem 0" }}>{data?.metrics.totalHeadcount}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>Operational members actively synchronized.</p>
            </div>
            <div>
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>02 // Contracts</span>
              <p className="serif-text" style={{ fontSize: "3.5rem", margin: "0.5rem 0" }}>{data?.metrics.activeContracts}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>Verified employment and partner logs.</p>
            </div>
            <div>
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>03 // Retention</span>
              <p className="serif-text" style={{ fontSize: "3.5rem", margin: "0.5rem 0" }}>{data?.metrics.retentionRate}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>Stability indexes maintained this fiscal term.</p>
            </div>
            <div>
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>04 // Onboarding</span>
              <p className="serif-text" style={{ fontSize: "3.5rem", margin: "0.5rem 0" }}>{data?.metrics.onboardingCompletion}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>Standard onboarding flows fully executed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES / MODULES */}
      <section id="features" style={{ padding: "8rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ marginBottom: "5rem", maxWidth: "600px" }}>
            <span className="swiss-mono" style={{ color: "var(--fg-secondary)" }}>SYSTEM STRUCTURE</span>
            <h2 style={{ fontSize: "3rem", marginTop: "0.5rem" }}>Bespoke Modules for High-End Administration</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "3rem" }}>
              <span className="serif-text" style={{ fontSize: "2rem", color: "var(--fg-secondary)", display: "block" }}>I.</span>
              <h3 className="serif-text" style={{ fontSize: "1.6rem", margin: "1rem 0" }}>Personnel Directories</h3>
              <p style={{ color: "var(--fg-secondary)", fontSize: "0.95rem", lineHeight: "1.7" }}>
                Organize employment vectors and talent profiles with clean, architectural asymmetry.
              </p>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "3rem" }}>
              <span className="serif-text" style={{ fontSize: "2rem", color: "var(--fg-secondary)", display: "block" }}>II.</span>
              <h3 className="serif-text" style={{ fontSize: "1.6rem", margin: "1rem 0" }}>Bespoke Payroll</h3>
              <p style={{ color: "var(--fg-secondary)", fontSize: "0.95rem", lineHeight: "1.7" }}>
                Sophisticated financial ledgers, auto tax withholding runs, and quiet direct deposits.
              </p>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "3rem" }}>
              <span className="serif-text" style={{ fontSize: "2rem", color: "var(--fg-secondary)", display: "block" }}>III.</span>
              <h3 className="serif-text" style={{ fontSize: "1.6rem", margin: "1rem 0" }}>Time & Attendance</h3>
              <p style={{ color: "var(--fg-secondary)", fontSize: "0.95rem", lineHeight: "1.7" }}>
                Bespoke attendance logging, elegant absence queues, and shift alignment checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ padding: "8rem 0", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <span className="swiss-mono" style={{ color: "var(--fg-secondary)" }}>SOPHISTICATED SUBSCRIPTIONS</span>
          <h2 style={{ fontSize: "3rem", marginTop: "0.5rem", marginBottom: "3rem" }}>Bespoke Pricing Models</h2>

          {/* Toggle button minimal */}
          <div style={{ display: "inline-flex", gap: "1.5rem", marginBottom: "4rem", borderBottom: "1px solid var(--fg-primary)", paddingBottom: "0.5rem" }}>
            <button
              onClick={() => setIsYearly(false)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: !isYearly ? "bold" : "300",
                cursor: "pointer",
                color: "inherit"
              }}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: isYearly ? "bold" : "300",
                cursor: "pointer",
                color: "inherit"
              }}
            >
              Yearly save 20%
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", textAlign: "left" }}>
            <div className="pricing-card-boutique">
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>01 // ESSENTIAL</span>
              <h3 className="serif-text" style={{ fontSize: "1.8rem", marginTop: "1rem" }}>Boutique Plan</h3>
              <p style={{ color: "var(--fg-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Core tools for independent agencies.</p>
              <div style={{ margin: "2rem 0" }}>
                <span className="serif-text" style={{ fontSize: "3rem" }}>${isYearly ? "79" : "99"}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--fg-secondary)" }}> / month</span>
              </div>
              <button className="btn-editorial-secondary" style={{ width: "100%" }}>Select Plan</button>
            </div>

            <div className="pricing-card-boutique" style={{ borderColor: "var(--fg-primary)", position: "relative" }}>
              <span style={{
                position: "absolute",
                top: "-12px",
                left: "2rem",
                background: "var(--fg-primary)",
                color: "var(--bg-primary)",
                fontSize: "0.7rem",
                padding: "0.2rem 1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase"
              }}>
                MOST CHOSEN
              </span>
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>02 // AUTOMATED</span>
              <h3 className="serif-text" style={{ fontSize: "1.8rem", marginTop: "1rem" }}>Atelier Plan</h3>
              <p style={{ color: "var(--fg-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Fully unified automation for scaling brands.</p>
              <div style={{ margin: "2rem 0" }}>
                <span className="serif-text" style={{ fontSize: "3rem" }}>${isYearly ? "199" : "249"}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--fg-secondary)" }}> / month</span>
              </div>
              <button className="btn-editorial" style={{ width: "100%" }}>Select Atelier</button>
            </div>

            <div className="pricing-card-boutique">
              <span className="swiss-mono" style={{ color: "var(--fg-secondary)", fontSize: "0.75rem" }}>03 // UNLIMITED</span>
              <h3 className="serif-text" style={{ fontSize: "1.8rem", marginTop: "1rem" }}>Maison Plan</h3>
              <p style={{ color: "var(--fg-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Total database customisation.</p>
              <div style={{ margin: "2rem 0" }}>
                <span className="serif-text" style={{ fontSize: "3rem" }}>Custom</span>
              </div>
              <button className="btn-editorial-secondary" style={{ width: "100%" }}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" style={{ padding: "8rem 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="swiss-mono" style={{ color: "var(--fg-secondary)" }}>INQUIRIES</span>
            <h2 style={{ fontSize: "3rem", marginTop: "0.5rem" }}>System Guidance</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                q: "What is the typical integration timeline?",
                a: "For most architectural agencies and creative collectives, migration completes in under 3 business days via our automated import pipeline tool."
              },
              {
                q: "Is personnel data protected legally?",
                a: "Every transaction is encrypted using AES-256 standards. We operate on SOC2 certified storage matrices, executing daily backups automatically."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ borderBottom: "1px solid var(--border-color)", padding: "1.5rem 0" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--fg-primary)"
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ fontSize: "1.2rem", fontWeight: "300" }}>
                    {openFaq === idx ? "—" : "+"}
                  </span>
                </button>
                <div style={{
                  maxHeight: openFaq === idx ? "150px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  color: "var(--fg-secondary)",
                  fontSize: "0.95rem",
                  marginTop: openFaq === idx ? "1rem" : "0",
                  lineHeight: "1.7"
                }}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border-color)", padding: "5rem 0", backgroundColor: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "3rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", letterSpacing: "0.1em" }}>AESTHETE</span>
            <p style={{ marginTop: "1rem", color: "var(--fg-secondary)", fontSize: "0.9rem", maxWidth: "300px" }}>
              Bespoke HRIS solutions designed for the architectural and boutique design sector.
            </p>
          </div>
          <div className="swiss-mono" style={{ display: "flex", gap: "4rem", fontSize: "0.8rem", color: "var(--fg-secondary)" }}>
            <div>
              <p style={{ fontWeight: "bold", color: "var(--fg-primary)", marginBottom: "1rem" }}>NAVIGATION</p>
              <p><a href="#about" style={{ color: "inherit", textDecoration: "none" }}>ABOUT</a></p>
              <p style={{ marginTop: "0.5rem" }}><a href="#features" style={{ color: "inherit", textDecoration: "none" }}>MODULES</a></p>
              <p style={{ marginTop: "0.5rem" }}><a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>PRICING</a></p>
            </div>
            <div>
              <p style={{ fontWeight: "bold", color: "var(--fg-primary)", marginBottom: "1rem" }}>CONTACT</p>
              <p>SALES@AESTHETE.CO</p>
              <p style={{ marginTop: "0.5rem" }}>INSTAGRAM</p>
              <p style={{ marginTop: "0.5rem" }}>LINKEDIN</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
