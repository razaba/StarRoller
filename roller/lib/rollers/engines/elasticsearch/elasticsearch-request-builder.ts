import UnrollQuery from "../../../unroll-query";
import StarMetadata from "../../../stars/star-metadata";
import {IndexDocumentParams, IndicesCreateParams, IndicesExistsParams} from "elasticsearch";
import {ROLLING_STARS_INDEX_MAPPING} from "../../../../mappings/stars-index-mapping";

export default class ElasticsearchRequestBuilder {
	private _storeConfiguration: any;

	constructor(storeConfiguration: any) {
		this._storeConfiguration = storeConfiguration;
	}

	public buildIndexDocumentParams(starMetadata: StarMetadata): IndexDocumentParams<StarMetadata> {
		return {
			index: this._storeConfiguration.indexName,
			type: this._storeConfiguration.typeName,
			id: `${starMetadata._id}`,
			body: starMetadata
		};
	}

	public indexExistsRequest(): IndicesExistsParams {
		return {index: this._storeConfiguration.indexName};
	}

	public createIndexRequest(): IndicesCreateParams {
		return {
			index: this._storeConfiguration.indexName,
			body: ROLLING_STARS_INDEX_MAPPING
		};
	}

	public buildElasticsearchQuery(queryTerm: UnrollQuery) {
		const andQueryTerm = this.getQueryTermList(queryTerm);

		return {
			index: this._storeConfiguration.indexName,
			type: this._storeConfiguration.typeName,
			body: {
				query: {
					bool: {
						must: andQueryTerm
					}
				}
			}
		};
	}

	private getQueryTermList(queryTerm: UnrollQuery) {
		const queryTermList = [];
		if (queryTerm.getTextTerm()) {
			queryTermList.push(this.getTextQueryTerm(queryTerm));
		}

		if (queryTerm.getGeoJson()) {
			queryTermList.push(ElasticsearchRequestBuilder.getGeoShapeQueryTerm((queryTerm)));
		}

		return queryTermList;
	}

	private static getGeoShapeQueryTerm(queryTerm: UnrollQuery) {
		return {
			geo_shape: {
				geoJson: {
					shape: queryTerm.getGeoJson(),
					relation: queryTerm.getGeoRelation()
				}
			}
		};
	}

	private getTextQueryTerm(queryTerm: UnrollQuery) {
		return {
			match: {
				[this._storeConfiguration.queryFieldName]: queryTerm.getTextTerm()
			}
		};
	}
}