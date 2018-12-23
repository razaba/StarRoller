import StarMetadata from "../stars/star-metadata";
import {NOT_IMPLEMENTED_ERROR} from "../errors/not-implemented-error";
import UnrollQuery from "../unroll-query";
import RollingState from "./rolling-state";

export default class Roller {
	public roll(starMetadata: StarMetadata): Promise<RollingState> {
		throw NOT_IMPLEMENTED_ERROR;
	}

	public unroll(queryTerm: UnrollQuery): Promise<StarMetadata[]> {
		throw NOT_IMPLEMENTED_ERROR;
	}
}