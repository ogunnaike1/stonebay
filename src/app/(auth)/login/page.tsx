"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call NextAuth signIn("credentials", { ...form })
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "var(--radius-xl)",
          padding: "44px 40px 36px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--text-dark)", marginBottom: 8 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-mid)" }}>
            Sign in to your Stonebay account
          </p>
        </div>

        {/* OAuth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <OAuthButton icon={<GoogleIcon />} label="Continue with Google" hoverBorderColor="var(--teal)" />
          <OAuthButton icon={<FacebookIcon />} label="Continue with Facebook" hoverBorderColor="#1877F2" />
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 12, color: "var(--text-light)", letterSpacing: "0.06em" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: 14,
                color: "var(--text-dark)",
                outline: "none",
                transition: "border-color 0.2s",
                background: "white",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)" }}>
                Password
              </label>
              <Link href="/forgot-password" style={{ fontSize: 12, color: "var(--teal)", fontWeight: 500 }}>
                Forgot password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "11px 42px 11px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  fontSize: 14,
                  color: "var(--text-dark)",
                  outline: "none",
                  transition: "border-color 0.2s",
                  background: "white",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-light)",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 8,
              background: "var(--teal)",
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.03em",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 24,
              opacity: loading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--teal)";
            }}
          >
            {loading ? <LoadingSpinner /> : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />

        {/* Role links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Link href="/register?role=BUYER" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              textAlign: "center",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
              (e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>🛍️</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-dark)" }}>New buyer?</div>
              <div style={{ fontSize: 11, color: "var(--teal)", marginTop: 2 }}>Create account →</div>
            </div>
          </Link>
          <Link href="/register?role=SELLER" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              textAlign: "center",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--sage)";
              (e.currentTarget as HTMLElement).style.background = "rgba(82,171,152,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>🏪</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-dark)" }}>New seller?</div>
              <div style={{ fontSize: 11, color: "var(--sage)", marginTop: 2 }}>Start selling →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function OAuthButton({
  icon,
  label,
  hoverBorderColor,
}: {
  icon: React.ReactNode;
  label: string;
  hoverBorderColor: string;
}) {
  return (
    <button
      type="button"
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontSize: 14,
        fontWeight: 500,
        color: "var(--text-dark)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = hoverBorderColor;
        (e.currentTarget as HTMLElement).style.background = "var(--off-white)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.background = "white";
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <div style={{
      width: 18,
      height: 18,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "white",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}