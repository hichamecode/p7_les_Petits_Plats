export default class ExtractDataToObject
{
	static extractInArray(data, key)
	{
		const result = []
		for (let i = 0; i < data.length; i++) {
			const object = data[i]
			const keys = Object.keys(object)
			for (let j = 0; j < keys.length; j++) {
				const keyOfObject = keys[j]
				if (keyOfObject == key) {
					result[result.length] = object[key]
				}
			}
		}

		return result
	}
}
