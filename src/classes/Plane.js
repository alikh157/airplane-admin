import axios from "axios";
import apiConf from "../apiConfig.json"
import desliser from '../helpers/jsonSerialiserMiddleware'

export default class Plane {
    model = "";
    capacity = 0;
    airlineName = "";
    flightNumber = "";

    constructor(jsonObject = {}) {
        const {
            id = "",
            airplaneAirlineName = "",
            airplaneModel = "",
            airplaneImageSrc = "",
            airplaneCapacity = "",
            airplaneFlightNumber = "",
        } = jsonObject
        this.id = id
        this.model = airplaneModel
        this.capacity = airplaneCapacity
        this.airlineName = airplaneAirlineName
        this.flightNumber = airplaneFlightNumber
        this.airlineImage = airplaneImageSrc
    }


    serialize() {
        console.log("this",this)
        return {
            "airplaneId":this.airplaneId,
            "airplaneModel": this.model,
            "airplaneCapacity": this.capacity,
            "airplaneAirlineName": this.airlineName,
            "airplaneFlightNumber": this.flightNumber,
            "airplaneImageSrc": this.airlineImage
        }
    }


    static apiGetAll(onSuccess = () => {
    }, onError = () => {
    }) {
        // console.log(apiConf.baseUrl+"/airplanes")
        // axios.get("/hi")
        axios.post(apiConf.baseUrl + "/airplane/get")
            .then(async data => {
                // console.log(data);
                const deserilized = await desliser(data.data)
                console.log(deserilized)
                let objectArray = []
                if (Array.isArray(deserilized)) {
                    objectArray = deserilized.map(airplaneJson => {
                        return (new Plane(airplaneJson))
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
        axios.post(apiConf.baseUrl + "/airplane/create", this.serialize())
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
        axios.post(apiConf.baseUrl + `/airplane/update`, this.serialize())
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
        axios.post(apiConf.baseUrl + `/airplane/delete`, {airplaneId: this.id})
            .then(() => {
                onSuccess();
            })
            .catch(() => {
                onError();
            })
    }

}