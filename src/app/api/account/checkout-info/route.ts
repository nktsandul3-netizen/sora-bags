import { auth } from "@/auth";
import { getAddresses, getProfile } from "@/lib/account";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ authenticated: false });
  }

  const [profile, addresses] = await Promise.all([
    getProfile(session.user.id),
    getAddresses(session.user.id),
  ]);

  const def = addresses.find((a) => a.isDefault) ?? addresses[0];

  return Response.json({
    authenticated: true,
    name: def?.recipient || profile?.name || "",
    email: profile?.email || "",
    phone: def?.phone || "",
    city: def?.city || "",
    address: def?.street || "",
    defaultAddressId: def?.id || null,
    addresses,
  });
}