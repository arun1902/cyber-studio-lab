import { ImageResponse } from "next/og";

export const alt = "CyberStudioLab — Learn. Build. Secure.";
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
          background: "#070b10",
          color: "#e6edf3",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 2 }}>
          Cyber<span style={{ color: "#22d3ee" }}>Studio</span>Lab
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, lineHeight: 0.95, letterSpacing: -4 }}>
            <span>Learn.&nbsp;</span>
            <span style={{ color: "#22d3ee" }}>Build.&nbsp;</span>
            <span style={{ color: "#fcd34d" }}>Secure.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#8b98a5" }}>
            A developer & cybersecurity knowledge platform.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8b98a5" }}>cyberstudiolab.com</div>
      </div>
    ),
    { ...size },
  );
}
