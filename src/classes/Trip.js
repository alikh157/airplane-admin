import desliser from '../helpers/jsonSerialiserMiddleware'
import axios from "axios";
import apiConf from "../apiConfig.json"

export default class Trip {
    constructor(jsonObject = {}) {
        const {
            id = "",
            tripName = "",
            tripSrc = "",
            tripTakeOffTime = "",
            tripDst = "",
            tripLandingTime = "",
            tripDate = "",
            tripPrice = 0,
            tripInternalOrExternal = "",
            tripClass = "",
            tripNumber = "",
            tripAirplaneObject= {}
                // tripAirplaneId = "",
        } = jsonObject
        this.id = id
        this.name = tripName

        this.src = tripSrc
        this.tripTakeOffTime = tripTakeOffTime

        this.dst = tripDst
        this.tripLandingTime = tripLandingTime
        this.tripDate = tripDate

        this.price = tripPrice
        this.internalOrExternal = tripInternalOrExternal
        this.number = tripNumber
        this.class = tripClass

        this.airplaneId = tripAirplaneObject.tripAirplaneId
    }

    serialize() {
        return {
            "tripName": this.name,
            "tripSrc": this.src,
            "tripTakeOffTime": this.tripTakeOffTime,
            "tripDst": this.dst,
            "tripLandingTime": this.tripLandingTime,
            "tripDate": this.tripDate,
            "tripPrice": this.price,
            "tripInternalOrExternal": this.internalOrExternal,
            "tripNumber": this.number,
            "tripClass": this.class,
            "tripAirplaneId": this.airplaneId
        }
    }

    static apiGetAll(onSuccess = () => {
    }, onError = () => {
    }) {
        // console.log(apiConf.baseUrl+"/airplanes")
        // axios.get("/hi")
        axios.post(apiConf.baseUrl + "/trip/read/all")
            .then(async data => {
                const deserilized = await desliser(data.data)
                console.log("deserilized",deserilized[0]);
                let objectArray = []
                if (Array.isArray(deserilized[0].go)) {
                    objectArray = deserilized[0].go.map(tripsJson => {
                        return (new Trip(tripsJson))
                    })
                }
                onSuccess(objectArray)
            })
            .catch(err => {
                onError(err)
            })
    }

    apipost(onSuccess = () => {
    }, onError = () => {
    }) {
        axios.post(apiConf.baseUrl + "/trip/create", this.serialize())
            .then(data => {
                onSuccess()
            })
            .catch(err => {
                onError(err)
            })
    }

    apiUpdate(onSuccess = () => {
    }, onError = () => {
    }) {
        axios.post(apiConf.baseUrl + `/trip/update`, this.serialize())
            .then(() => {
                onSuccess();
            })
            .catch(() => {
                onError();
            })
    }

    apiDelete(onSuccess = () => {
    }, onError = () => {
    }) {
        axios.post(apiConf.baseUrl + `/trip/delete`, {tripId: this.id})
            .then(() => {
                onSuccess();
            })
            .catch(() => {
                onError();
            })
    }

}