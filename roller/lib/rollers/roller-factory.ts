import ElasticsearchRoller from "./engines/elasticsearch/elasticsearch-roller";
import {Client, ConfigOptions} from "elasticsearch";
import ElasticsearchRequestBuilder from "./engines/elasticsearch/elasticsearch-request-builder";

export default class RollerFactory {
	private readonly _textExtractor;

	constructor(textExtractor) {
		this._textExtractor = textExtractor;
	}

	public createElasticsearchRoller(configuration: ConfigOptions, storeConfiguration: any): ElasticsearchRoller {
		return new ElasticsearchRoller(new Client(configuration), this._textExtractor, "", new ElasticsearchRequestBuilder(storeConfiguration));
	}
}
