import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    // Extract parameters from the URL search params
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const status = url.searchParams.get('status');

    if (!id || !status) {
      return NextResponse.json({ error: "ID and Status are required" }, { status: 400 });
    }

    // Update application status in the database
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
