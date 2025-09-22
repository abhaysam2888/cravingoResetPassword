import React, { useState } from "react";
import authService from "../appwrite/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Get URL params (works without react-router)
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    if (!userId || !secret) {
      setMessage({ text: "Invalid password reset link.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await authService.resetPassword(userId, secret, password);
      setMessage({
        text: "Password reset successfully! You can now login.",
        type: "success",
      });
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage({
        text: err.message || "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 30,
          borderRadius: 12,
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#2f3640" }}>
          Reset Password
        </h2>

        <form
          onSubmit={handleReset}
          style={{ display: "flex", flexDirection: "column", gap: 15 }}
        >
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              outline: "none",
              fontSize: 16,
            }}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              outline: "none",
              fontSize: 16,
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 14,
              borderRadius: 8,
              border: "none",
              backgroundColor: "#3498db",
              color: "#fff",
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2980b9")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3498db")
            }
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message.text && (
          <p
            style={{
              marginTop: 20,
              textAlign: "center",
              color: message.type === "error" ? "#e74c3c" : "#2ecc71",
              fontWeight: 500,
            }}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
