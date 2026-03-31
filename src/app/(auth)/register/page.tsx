"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Store, Check } from "lucide-react";

type Role = "BUYER" | "SELLER";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("BUYER");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // seller only
    storeName: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call GraphQL mutation createUser
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      {/* Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "var(--radius-xl)",
          padding: "40px 40px 36px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "var(--text-dark)", marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-mid)" }}>
            Join thousands of buyers and sellers on Stonebay
          </p>
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-mid)", marginBottom: 12 }}>
            I want to
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <RoleCard
              active={role === "BUYER"}
              onClick={() => setRole("BUYER")}
              icon={<User size={22} />}
              title="Shop & Buy"
              desc="Browse and purchase from verified sellers"
            />
            <RoleCard
              active={role === "SELLER"}
              onClick={() => setRole("SELLER")}
              icon={<Store size={22} />}
              title="Sell Products"
              desc="List products and grow your business"
            />
          </div>
        </div>

        {/* OAuth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <OAuthButton
            icon={<GoogleIcon />}
            label={`Continue with Google as ${role === "BUYER" ? "Buyer" : "Seller"}`}
            hoverBorderColor="var(--teal)"
          />
          <OAuthButton
            icon={<FacebookIcon />}
            label={`Continue with Facebook as ${role === "BUYER" ? "Buyer" : "Seller"}`}
            hoverBorderColor="#1877F2"
          />
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 12, color: "var(--text-light)", letterSpacing: "0.06em" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <InputField
              label="First name"
              name="firstName"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Last name"
              name="lastName"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <InputField
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone - seller only */}
          {role === "SELLER" && (
            <div style={{ marginBottom: 14 }}>
              <InputField
                label="Phone number"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Store name - seller only */}
          {role === "SELLER" && (
            <div style={{ marginBottom: 14 }}>
              <InputField
                label="Store name"
                name="storeName"
                placeholder="e.g. StyleHaus Lagos"
                value={form.storeName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
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
            {/* Password strength hint */}
            {form.password.length > 0 && (
              <PasswordStrength password={form.password} />
            )}
          </div>

          {/* Terms */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: `2px solid ${agreed ? "var(--teal)" : "var(--border)"}`,
                background: agreed ? "var(--teal)" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                marginTop: 1,
                transition: "all 0.2s",
              }}
            >
              {agreed && <Check size={11} color="white" strokeWidth={3} />}
            </button>
            <span style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.5 }}>
              I agree to Stonebay&apos;s{" "}
              <Link href="/terms" style={{ color: "var(--teal)", fontWeight: 500 }}>Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" style={{ color: "var(--teal)", fontWeight: 500 }}>Privacy Policy</Link>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !agreed}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 8,
              background: agreed ? "var(--teal)" : "var(--blue-grey)",
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.03em",
              cursor: agreed ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              if (agreed) (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)";
            }}
            onMouseLeave={(e) => {
              if (agreed) (e.currentTarget as HTMLElement).style.background = "var(--teal)";
            }}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              `Create ${role === "BUYER" ? "Buyer" : "Seller"} Account`
            )}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-mid)", marginTop: 20 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--teal)", fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function RoleCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "16px 14px",
        borderRadius: 10,
        border: `2px solid ${active ? "var(--teal)" : "var(--border)"}`,
        background: active ? "rgba(43,103,119,0.05)" : "white",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
        position: "relative",
      }}
    >
      {active && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          width: 18, height: 18, borderRadius: "50%",
          background: "var(--teal)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Check size={10} color="white" strokeWidth={3} />
        </div>
      )}
      <div style={{ color: active ? "var(--teal)" : "var(--text-mid)", marginBottom: 8 }}>
        {icon}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: active ? "var(--teal)" : "var(--text-dark)", marginBottom: 3 }}>
        {title}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-light)", lineHeight: 1.4 }}>
        {desc}
      </div>
    </button>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
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
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      {checks.map((c) => (
        <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: c.pass ? "var(--sage)" : "var(--border)",
            transition: "background 0.2s",
          }} />
          <span style={{ fontSize: 11, color: c.pass ? "var(--sage)" : "var(--text-light)" }}>
            {c.label}
          </span>
        </div>
      ))}
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
      width: 18, height: 18,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "white",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}