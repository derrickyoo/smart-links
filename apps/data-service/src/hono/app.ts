import { getLink } from '@repo/data-ops/queries/links';
import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

app.get('/:id', async (c) => {
	const id = c.req.param('id');
	const linkInfoFromDb = await getLink(id);

	return c.json({
		data: linkInfoFromDb,
	});
});

export default app;
