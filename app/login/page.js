"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to the home page if already logged in
    }
  }, [session, router]);

  return (
    <div className="flex items-center sm:flex-row">
      <div className="flex items-center flex-col sm:flex-row mt-[25vh]">
        <Image
          className="dark:invert"
          src="/ecommerce.png"
          alt="Ecommerce Logo"
          width={600}
          height={100}
          priority
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <div className="flex items-center justify-center">
              <button onClick={()=>{signIn("google")}} style={buttonStyle}>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#EA4335",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s ease",
};
