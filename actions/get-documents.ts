import { db } from "@/lib/db";

export const getDocuments = async () => {
  try {
    const documents = await db.document.findMany({
      where: {
        isPublished: true, // Only fetch documents where isPublished is true
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
      include: {
        Attachments: true, // Include related attachments
      },
    });

    console.log("Documents fetched:", documents); // Log the fetched data to verify

    return documents;

  } catch (error) {
    console.error("[GET_DOCUMENTS]", error);
    return [];
  }
};
