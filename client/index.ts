import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';


type Pin = {
    longitude: number,
    latitude: number,
    direction: number,
    polygon_name?: string,
    name?: string,
    value?: number,
};

var mapOpen = true;
var theatre = fromLonLat([37.618536, 55.760257]);
var view = new View({
    center: theatre,
    zoom: 15,
});
var map: Map;

function showMap() {
    if (mapOpen) {
        map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: view,
        });
        mapOpen = false;
    }
}

function showPoints(data: Array<Pin>) {
    //parse points and convert them to features for vectorLayer
    const features = data.map((point) => new Feature({
        geometry: new Point(fromLonLat([point.longitude, point.latitude]))
    }));
    features.map((feature, i) => feature.setStyle(new Style({
        image: new Icon({
            src: "api/static/arrow.svg",
            scale: 0.05,
            rotation: data[i].direction / 360 * (2 * Math.PI),
            crossOrigin: "anonymous",
            color: "white",
        })
    })));
    let vectorSource = new VectorSource({ features: features });
    const vectorLayer = new VectorLayer({ source: vectorSource });
    let layers = map.getLayers();
    map.setLayers(layers.getArray().slice(0, 0));
    map.addLayer(vectorLayer);
    view.setCenter(fromLonLat([data[0].longitude, data[0].latitude]));
    console.log(map.getLayers());
    map.renderSync();
}

function showValue(value: number) {
    document.getElementById("value_result")!.innerText = "Результат: " + value.toString();
}

window.addEventListener('DOMContentLoaded', () => {
    //Parse file
    let form = document.getElementById("file_form")!;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget!;
        const url = (form as HTMLFormElement).action;

        try {
            const formData = new FormData((form as HTMLFormElement));
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            let data = JSON.parse(await response.text());
            let points: Array<Pin> = (data["points"] as Array<any>).map((p) => ({ longitude: p["lon"], latitude: p["lat"], direction: p["azimuth"] } as Pin));
            showPoints(points);
            showValue(data["value"]);
        } catch (error) {
            console.error(error);
        }
    }
    //Parse audience form
    let second_form = document.getElementById("aud_form")!;
    second_form.onsubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget!;
        const url = (form as HTMLFormElement).action;

        try {
            const formData = new FormData((form as HTMLFormElement));
            let income = "";
            if (formData.get("income_a") != null) {
                income += "a"
            }
            if (formData.get("income_b") != null) {
                income += "b"
            }
            if (formData.get("income_c") != null) {
                income += "c"
            }
            let body = {
                "targetAudience": {
                    "name": "",
                    "gender": formData.get("gender")!.toString(),
                    "ageFrom": parseInt(formData.get("age_from")!.toString()),
                    "ageTo": parseInt(formData.get("age_to")!.toString()),
                    "income": income,
                },
                "sides": parseInt(formData.get("boards")!.toString()),
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            let points: Array<Pin> = [];
            let data = JSON.parse(await response.text());
            console.log(data[0]);

            for (let point of data) {
                let dir = point["direction"]
                switch (dir) {
                    case "N":
                        dir = 0;
                        break;
                    case "NE":
                        dir = 45;
                        break;
                    case "E":
                        dir = 90;
                        break;
                    case "SE":
                        dir = 135;
                        break;
                    case "S":
                        dir = 180;
                        break;
                    case "SW":
                        dir = 225;
                        break;
                    case "W":
                        dir = 270;
                        break;
                    case "NW":
                        dir = 315;
                        break;
                }
                point["direction"] = dir;
                points.push(point);
            }
            showPoints(points);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(showMap);
});
