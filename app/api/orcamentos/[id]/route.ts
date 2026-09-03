import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

const STATUS_VALUES = [
  "NOVO",
  "EM_ANALISE",
  "RESPONDIDO",
  "APROVADO",
  "RECUSADO",
] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const data: { status?: (typeof STATUS_VALUES)[number]; internalNotes?: string } = {};

  if (body.status !== undefined) {
    if (!STATUS_VALUES.includes(body.status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 });
    }
    data.status = body.status;
  }

  if (body.internalNotes !== undefined) {
    data.internalNotes = String(body.internalNotes);
  }

  const quote = await prisma.quote.update({ where: { id }, data });

  return NextResponse.json({ quote });
}
