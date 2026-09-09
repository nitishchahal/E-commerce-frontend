import { supabase } from "../lib/supabase";

export async function getAuthErrorMessage(error, context = "login") {
  const message = String(error?.message || "").toLowerCase();

  if (message.includes("email not confirmed")) {
    return "Please verify your email address before logging in.";
  }

  if (message.includes("invalid login credentials")) {
    return "Invalid email or password. If you just registered, verify your email first.";
  }

  if (message.includes("user already registered")) {
    return "An account with this email already exists. Please log in.";
  }

  if (message.includes("password should be at least")) {
    return "Password must be at least 8 characters long.";
  }

  if (message.includes("rate limit")) {
    return "Too many attempts. Please wait a little and try again.";
  }

  if (message.includes("failed to fetch") || message.includes("network")) {
    return "Unable to reach authentication service. Please check your connection and try again.";
  }

  return error?.message || (context === "login" ? "Login failed" : "Unable to create account");
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
