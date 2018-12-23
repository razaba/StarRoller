export default class StarMetadata {
	_id: number;
	name: string;
	nameKey: string;
	type: string;
	path: string;
	content?: string;
	uploader: string;
	uploaderDomain: string;
	uploaderUsername: string;
	creationDate: Date;
	modifyDate: Date;
	size: number;
	systemName: string;
	geoJson: object;
	source: {
		Classification: number;
		Clearance: number;
		Id: number;
		LinkedTriangleId: number;
		IsFlexible: boolean;
		Name: string;
		_id: number;
	};
	favoriteRate: number;
	isFavorite: boolean;
	editDate: Date;
	downloadCount: number;
	tags: string[];
	uploadDate: Date;
}