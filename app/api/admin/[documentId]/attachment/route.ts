import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { documentId: string } }
) {
    try {
        const { userId } = auth();
        const { url } = await req.json();
        
        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Validate document ownership
        const documentOwner = await db.document.findUnique({
            where: {
                id: params.documentId,
                userId: userId,
            },
        });

        if (!documentOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Create attachment with a connection to the document
        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop() || "", // Default to an empty string if `split` results in an empty array
                docId: params.documentId,
            },
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
