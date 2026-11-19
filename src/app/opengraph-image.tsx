import { ImageResponse } from "next/og";

export const alt = "cyberstudiolab — Learn. Build. Secure.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f9fc",
          color: "#1e1b4b",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: -1, fontWeight: 700 }}>
          <span>cyberstudio</span>
          <span style={{ color: "#4f46e5" }}>lab</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 0.95, letterSpacing: -3, fontWeight: 700 }}>
            <span>Learn. Build. </span>
            <span style={{ color: "#f97316" }}>Secure.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#64748b" }}>
            A developer & cybersecurity knowledge platform.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#64748b" }}>
          <span style={{ color: "#1e1b4b" }}>cyberstudio</span>
          <span style={{ color: "#4f46e5" }}>lab</span>
          <span>.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
