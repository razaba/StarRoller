export const ROLLING_STARS_INDEX_MAPPING = {
	"mappings": {
		"_doc": {
			"properties": {
				"name": {
					"type": "text",
					"copy_to": "query_field"
				},
				"nameKey": {"type": "keyword"},
				"type": {"type": "keyword"},
				"path": {"type": "keyword"},
				"content": {
					"type": "text",
					"copy_to": "query_field"
				},
				"uploader": {
					"type": "keyword",
					"copy_to": "query_field"
				},
				"uploaderDomain": {
					"type": "keyword",
					"copy_to": "query_field"
				},
				"uploaderUsername": {
					"type": "keyword",
					"copy_to": "query_field"
				},
				"creationDate": {
					"type": "date",
					"format": "strict_date_optional_time||epoch_millis"
				},
				"modifyDate": {
					"type": "date",
					"format": "strict_date_optional_time||epoch_millis"
				},
				"size": {
					"type": "integer"
				},
				"systemName": {
					"type": "keyword"
				},
				"geoJson": {
					"type": "geo_shape"
				},
				"source": {
					"properties": {
						"Classification": {
							"type": "integer"
						},
						"Clearance": {
							"type": "integer"
						},
						"Id": {
							"type": "integer"
						},
						"LinkedTriangleId": {
							"type": "integer"
						},
						"IsFlexible": {
							"type": "boolean"
						},
						"Name": {
							"type": "keyword",
							"copy_to": "query_field"
						},
						"_id": {
							"type": "integer"
						}
					}
				},
				"favoriteRate": {
					"type": "integer"
				},
				"isFavorite": {
					"type": "boolean"
				},
				"editDate": {
					"type": "date",
					"format": "strict_date_optional_time||epoch_millis"
				},
				"downloadCount": {
					"type": "integer"
				},
				"tags": {
					"type": "keyword",
					"copy_to": "query_field"
				},
				"uploadDate": {
					"type": "date",
					"format": "strict_date_optional_time||epoch_millis"
				},
				"query_field": {
					"type": "text"
				}
			}
		}
	}
};