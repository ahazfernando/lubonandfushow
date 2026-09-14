function parseEmailList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export function staffRolesForEmail(email: string | null | undefined) {
  const normalized = email?.trim().toLowerCase() ?? "";
  if (!normalized) {
    return { isAdmin: false, isWriter: false, isStaff: false };
  }

  const admins = parseEmailList(process.env.NEXT_PUBLIC_ADMIN_EMAILS);
  const writers = parseEmailList(process.env.NEXT_PUBLIC_WRITER_EMAILS);
  const openAccess = admins.length === 0 && writers.length === 0;

  const isAdmin = openAccess || admins.includes(normalized);
  const isWriter = openAccess || writers.includes(normalized) || isAdmin;
  const isStaff = isAdmin || isWriter;

  return { isAdmin, isWriter, isStaff };
}

const STAFF_PREFIXES = ["/admin", "/writer", "/dashboard", "/login/staff"];

export function isStaffPath(path: string) {
  return STAFF_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function safeNextPath(
  value: string | null | undefined,
  options?: { audience?: "customer" | "staff" },
) {
  const audience = options?.audience ?? "customer";
  const fallback = audience === "staff" ? "/dashboard" : "/";

  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  if (audience === "customer" && isStaffPath(value)) return "/";
  if (audience === "staff" && !isStaffPath(value)) return "/dashboard";

  return value;
}
