import Roller from "../../roller";
import RollingState from "../../rolling-state";
import {Client} from "elasticsearch";
import StarMetadata from "../../../stars/star-metadata";
import TextExtractor from "../../text-extractor/text-extractor";
import StorageError from "../../../errors/storage-error";
import UnrollQuery from "../../../unroll-query";
import ElasticsearchRequestBuilder from "./elasticsearch-request-builder";

export default class ElasticsearchRoller extends Roller {
	private _elasticsearchClient: Client;
	private _textExtractor: TextExtractor;
	private _ftpPathResolver;
	private _esRequestBuilder: ElasticsearchRequestBuilder;

	constructor(elasticsearchClient: Client, textExtractor: TextExtractor, ftpPathResolver, esRequestBuilder: ElasticsearchRequestBuilder) {
		super();
		this._elasticsearchClient = elasticsearchClient;
		this._textExtractor = textExtractor;
		this._ftpPathResolver = ftpPathResolver;
		this._esRequestBuilder = esRequestBuilder;
	}

	public async roll(starMetadata: StarMetadata): Promise<RollingState> {
		//todo handle exceptions
		//todo loggggggging
		const rollingState = new RollingState();
		rollingState.indexCreated = await this.createIndexIfNeeded();

		const metadata = JSON.parse(JSON.stringify(starMetadata));
		metadata.content = await this._textExtractor.extractFromUrl(this._ftpPathResolver.resolveToUrl(starMetadata.path));
		rollingState.indexState = await this.indexFileMetadata(metadata);

		return rollingState;
	}

	private async indexFileMetadata(starMetadata: StarMetadata): Promise<boolean> {
		const indexRequest = this._esRequestBuilder.buildIndexDocumentParams(starMetadata);

		try {
			await this._elasticsearchClient.index<StarMetadata>(indexRequest);
			return true;
		} catch (error) {
			//todo handle es exceptions
			throw new StorageError(`could not index file: ${indexRequest}`, error);
		}
	}

	private async createIndexIfNeeded(): Promise<boolean> {
		try {
			if (!await this._elasticsearchClient.indices.exists(this._esRequestBuilder.indexExistsRequest())) {
				await this._elasticsearchClient.indices.create(this._esRequestBuilder.createIndexRequest());
				return true;
			}
			return false;
		} catch (error) {
			throw new StorageError("could not check or create index", error);
		}
	}

	public async unroll(queryTerm: UnrollQuery): Promise<StarMetadata[]> {
		const result = await this._elasticsearchClient.search<StarMetadata>(this._esRequestBuilder.buildElasticsearchQuery(queryTerm));


		return result.hits.hits.map(hit => hit._source);
	}
}