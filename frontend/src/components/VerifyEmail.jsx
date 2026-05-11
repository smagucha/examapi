import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { uidb64, token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/useraccount/account-confirm-email/${uidb64}/${token}/`,
        );
        setMessage(res.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Verification failed"
        );
      }
    };

    verify();
  }, [uidb64, token]);
  console.log(message);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Email Verification</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default VerifyEmail; 