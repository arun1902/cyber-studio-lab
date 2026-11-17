import { ImageResponse } from "next/og";

export const alt = "Cyber Studio Lab — the digital world needs a safer mindset.";
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
          background: "#08090b",
          color: "#f3f0e7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#d8ff3e" }}>CYBER STUDIO LAB</div>
        <div style={{ display: "flex", fontSize: 78, lineHeight: 0.92, letterSpacing: -2, maxWidth: 920 }}>
          The digital world needs a safer mindset.
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a4a49a" }}>cyberstudiolab.com</div>
      </div>
    ),
    { ...size },
  );
}
