// /landing/layout.js
export default function LandingLayout({ children }) {
  console.log("children nested");
  return (
    <div>
      {children} {/* Render the landing page content */}
    </div>
  );
}
