"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const handleUnauthorized = (req: NextRequest) => {
  const res = NextResponse.redirect(`${req.nextUrl.origin}/auth`);
  res.cookies.delete("session");
  return res;
};

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return;
  try {
    return await decrypt(session);
  } catch (err) {
    console.log(err);
    return;
  }
}
