export default class ExtractDataToObject {
	static extractInArray(data, key) {
		return data.map(object => object[key])
	}
}