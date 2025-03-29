import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Join() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setToken(router.query.token || ""); // Ensure token updates
    }
  }, [router.isReady, router.query.token]);

  const handleAcceptInvitation = () => {
    router.push("/signup");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Join LaerHealth</h1>
      {token ? (
        <>
          <p>Your invitation token: <strong>{token}</strong></p>
          <button 
            onClick={handleAcceptInvitation} 
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#176BE0",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Accept Invitation
          </button>
        </>
      ) : (
        <p>Loading or invalid invitation link...</p> 
      )}
    </div>
  );
}
