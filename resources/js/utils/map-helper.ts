import Merchant from "@/models/Merchant";
import mapboxgl from "mapbox-gl";

export class MapHelper {
    public map: any;
    public merchants: Merchant[] = [];
    public bounds: any[] = [];

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

    setPoints(data: Merchant[]) {
        this.merchants = data;
    }

    getMap() {
        return this.map;
    }

    getBoundsFormMerchants() {
        return this.merchants.map((item) => item.toArrayCoordinate());
    }

    fitBounds() {
        if (this.getBoundsFormMerchants().length > 0)
            this.map.fitBounds(this.getBoundsFormMerchants());
    }

    addMarker(point: any, options?: { color?: string; rotation?: number }) {
        return new mapboxgl.Marker(options ?? {})
            .setLngLat(this.toPointArray(point))
            .addTo(this.map);
    }

    private toPointArray(point: any): number[] {
        return [point.lng, point.lat];
    }
}
