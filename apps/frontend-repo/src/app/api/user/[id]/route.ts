import { BEInstance } from "@/config/instances";
import URLS from "@/config/urls";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const id = (await params).id;

    const { data, status } = await BEInstance.put(
      URLS.BE_UPDATE_USER + "/" + id,
      body
    );

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const { data, status } = await BEInstance.delete(
      URLS.BE_DELETE_USER + "/" + id,
      { params: { id } }
    );

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
