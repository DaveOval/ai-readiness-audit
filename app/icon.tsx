import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          borderRadius: 8,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="22"
          height="22"
          fill="none"
        >
          <path
            d="M16 6L8 26h4l2-5h4l2 5h4L16 6zm0 8l2 5h-4l2-5z"
            fill="white"
          />
          <circle cx="24" cy="8" r="3" fill="white" opacity="0.7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
