import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';

var mapOpen = true;
var theatre = fromLonLat([37.618536, 55.760257]);
var view = new View({
    center: theatre,
    zoom: 15,
});


function showMap() {
    if (mapOpen) {
        const map = new Map({
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

function showPoints(data: JSON) {
    console.log(data);

}

window.addEventListener('DOMContentLoaded', () => {
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
            showPoints(await response.json());
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(showMap);
});
