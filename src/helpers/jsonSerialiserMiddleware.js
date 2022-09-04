import {Deserializer, Error} from 'jsonapi-serializer'

export default async function myDeserialize(jsonData) {
    let temp = "";
    let data = new Deserializer({keyForAttribute: "camelCase"})
    await data.deserialize(jsonData, async (err, desrializedData) => {
        if (err) {
            console.log(err)
            return false
        }
        temp = await desrializedData
    })
    console.log(temp)
    return temp
}