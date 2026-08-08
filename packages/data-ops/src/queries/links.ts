import { getDb } from "@/db/database";
import { links } from "@/drizzle-out/schema";
import { CreateLinkSchemaType } from "@/zod/links";
import { nanoid } from "nanoid";

export async function createLink(
	data: CreateLinkSchemaType & { accountId: string },
) {
	const db = getDb();
	const id = nanoid(10);

	const [created] = await db
		.insert(links)
		.values({
			linkId: id,
			accountId: data.accountId,
			name: data.name,
			destinations: JSON.stringify(data.destinations),
		})
		.returning({ linkId: links.linkId });

	if (!created) {
		throw new Error("Failed to create link");
	}

	return created;
}
