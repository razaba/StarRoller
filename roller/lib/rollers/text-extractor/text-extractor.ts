import * as textract from "textract";
import ExtractionError from "../../errors/extraction-error";

export default class TextExtractor {
	public async extractFromPath(filePath: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			textract.fromFileWithPath(filePath, (error, content: string) => {
				if (error) {
					return reject(new ExtractionError(`could not extract text from file path: ${filePath}`, error));
				}
				return resolve(content);
			});
		});
	}

	public async extractFromUrl(fileUrl: string): Promise<String> {
		return new Promise<string>((resolve, reject) => {
			textract.fromUrl(fileUrl, (error, content: string) => {
				if (error) {
					return reject(new ExtractionError(`could not extract text from file url: ${fileUrl}`, error));
				}
				return resolve(content);
			});
		});
	}
}