import "../globals.css";

export const metadata = {
  title: "Ecommerce Website.",
  description: "Get New Open Box Products at great discounts...",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
