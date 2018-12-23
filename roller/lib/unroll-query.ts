import {GeoJSON} from "geojson";
import QueryError from "./errors/query-error";


export enum GeoQueryRelation {
	INTERSECTS = "INTERSECTS",
	WITHIN = "WITHIN",
	DISJOINT = "DISJOINT",
	CONTAINS = "CONTAINS"
}

export default class UnrollQuery {
	private readonly _textTerm: string;
	private readonly _geoJson: GeoJSON;
	private readonly _geoRelation: GeoQueryRelation;

	private constructor(textTerm: string | null, geoJson: GeoJSON | null, geoRelation: GeoQueryRelation) {
		this._textTerm = textTerm;
		this._geoJson = geoJson;
		this._geoRelation = geoRelation;
	}

	public getGeoRelation(): string {
		return this._geoRelation;
	}

	public getGeoJson(): GeoJSON {
		return this._geoJson;
	}

	public getTextTerm(): string {
		return this._textTerm;
	}

	public static createUnrollQuery(textTerm: string | null, geoJson: GeoJSON | null, geoRelation: GeoQueryRelation = GeoQueryRelation.INTERSECTS) {
		if (!textTerm && !geoJson) {
			throw new QueryError("cannot create unroll query, please define one of the parameter: textTerm or geoJson");
		}
		return new UnrollQuery(textTerm, geoJson, geoRelation);
	}
}