import mapboxgl from "mapbox-gl";

export class MapHelper {
    public map: any;

    constructor(container: any, accessToken: string) {
        this.map = new mapboxgl.Map({
            container,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: "mapbox://styles/mapbox/streets-v12",
            center: [2.293334, 48.915274],
            zoom: 8,
            accessToken,
        });
    }

    getMap() {
        return this.map;
    }

    addMarker(point: any, options?: { color?: string; rotation?: number }) {
        return new mapboxgl.Marker(options ?? {})
            .setLngLat(this.toPointArray(point))
            .addTo(this.map);
    }

    private toPointArray(point: any): number[] {
        return [point.lng, point.lat];
    }

    private toPointString(point: any): string {
        return `${point.lng},${point.lat}`;
    }
}
