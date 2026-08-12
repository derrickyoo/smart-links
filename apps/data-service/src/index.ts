import { initDatabase } from '@repo/data-ops/database';
import { WorkerEntrypoint } from 'cloudflare:workers';
import app from './hono/app';

export default class DataService extends WorkerEntrypoint<Env> {
	constructor(ctx: ExecutionContext, env: Env) {
		super(ctx, env);
		initDatabase(env.DB);
	}

	fetch(request: Request) {
		return app.fetch(request, this.env, this.ctx);
	}

	async queue(batch: MessageBatch): void | Promise<void> {
		for (const message of batch.messages) {
			console.log('Queue Event:', message.body);
		}
	}
}
