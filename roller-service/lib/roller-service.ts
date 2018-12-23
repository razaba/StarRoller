import Roller from "roller/lib/rollers/roller";
import * as Koa from "koa";
import * as Application from "koa";
import {Context} from "koa";
import * as koaBody from "koa-body";
import * as Router from "koa-router";
import {Server} from "http";
import UnrollQuery from "roller/lib/unroll-query";

export class RollerService {
	private readonly _port: number;
	private _roller: Roller;
	private _app: Application;
	private _server: Server;

	constructor(port: number, roller: Roller) {
		this._port = port;
		this._roller = roller;
		const router = new Router()
			.post("/roll_star", async (ctx) => this.rollStar(ctx))
			.post("/unroll_star", async (ctx) => this.unrollStar(ctx));
		this._app = new Koa();
		this._app.use(koaBody());
		this._app.use(router.routes());
		this._app.use(router.allowedMethods());
	}

	public start() {
		this._server = this._app.listen(this._port);

		console.log(`listening on port ${this._port}`);
	}

	private async rollStar(ctx: Context) {
		try {
			const request = ctx.request;

			const rollingState = await this._roller.roll(request.body);
			if (rollingState.indexState) {
				ctx.body = "roll start work great";
				ctx.status = 200;
			}

		} catch (error) {
			// todo log
			console.error(error);
			ctx.body = "roll start fucked up";
			ctx.status = 500; //todo decide which error is the right per error;
		}
	}

	private async unrollStar(ctx: Context) {
		try {
			const request = ctx.request;
			if (!request.body.query || (!request.body.query.text && !request.body.query.geoJson)) {
				ctx.status = 400;
				ctx.body = "query is required";
				return;
			}
			const starList = await this._roller.unroll(UnrollQuery.createUnrollQuery(request.body.query.text, request.body.query.geoJson));
			if (!starList) {
				ctx.body = [];
				ctx.status = 200;
				return;
			}

			ctx.body = JSON.stringify(starList);
			ctx.status = 200;
		} catch (error) {
			// todo log
			console.error(error);
			ctx.body = "roll start fucked up";
			ctx.status = 500; //todo decide which error is the right per error;
		}
	}
}

export function createService(roller: Roller) {
	return new RollerService(1111, roller);
}