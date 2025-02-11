import { BEInstance } from "@/config/instances";
import URLS from "@/config/urls";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, status } = await BEInstance.get(URLS.BE_FETCH_USER);

    if (status !== 200)
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 500 }
      );

    return NextResponse.json(data.users);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, status } = await BEInstance.post(URLS.BE_CREATE_USER, body);

    if (status !== 200)
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 500 }
      );

    return NextResponse.json(data.users);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
