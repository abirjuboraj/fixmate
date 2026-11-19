"use client";

// Last-resort error boundary: only used when the ROOT LAYOUT itself
// fails to render. It must provide its own <html> and <body> tags.
// (Inline styles are added as a safety net in case the global CSS
// failed to load along with the layout.)

import { Wrench, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#ffffff",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem 1rem",
            gap: "1rem",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
              }}
            >
              <Wrench size={48} color="#ef4444" style={{ transform: "rotate(-12deg)" }} />
            </div>
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                backgroundColor: "#ef4444",
                color: "#ffffff",
              }}
            >
              <AlertTriangle size={16} />
            </span>
          </div>

          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>
            FixMate Hit a Bump
          </h1>
          <p style={{ maxWidth: "28rem", lineHeight: 1.6, color: "#64748b", margin: 0 }}>
            The application ran into a critical error. Please try again — if it
            keeps happening, come back a little later.
          </p>

          {process.env.NODE_ENV !== "production" && error?.message && (
            <p
              style={{
                maxWidth: "32rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#b91c1c",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                wordBreak: "break-all",
              }}
            >
              {error.message}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#007C7D",
                color: "#ffffff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
