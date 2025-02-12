import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const token = cookies().get("token")

  if (!token) {
    return NextResponse.json({ user: null })
  }

  try {
    const res = await fetch("https://ecom-backend-pzc3.onrender.com/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch user")
    }

    const data = await res.json()
    return NextResponse.json({ user: data.user })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}

