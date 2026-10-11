import type {LngLat, LngLatBounds, DrawingStyle, Geometry} from '../lib/ymaps';

export function bbox(points: LngLat[]): LngLatBounds {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;
    for (const point of points) {
        minLat = Math.min(minLat, point[1]);
        maxLat = Math.max(maxLat, point[1]);
        minLng = Math.min(minLng, point[0]);
        maxLng = Math.max(maxLng, point[0]);
    }
    return [
        [minLng, minLat],
        [maxLng, maxLat]
    ];
}

export function getFeatureCoordinates(route: LngLat[], separatingIndex: number, isRemainingRoute?: boolean) {
    if (separatingIndex === 0) {
        if (isRemainingRoute) {
            return route;
        } else {
            return [];
        }
    }

    if (separatingIndex === route.length - 1) {
        if (isRemainingRoute) {
            return [];
        } else {
            return route;
        }
    }

    if (isRemainingRoute) {
        return route.slice(separatingIndex);
    } else {
        if (route[separatingIndex + 2]) {
            return route.slice(0, separatingIndex + 2);
        } else {
            return route.slice(0, separatingIndex);
        }
    }
}

export function getFeatureGeometry(coordinates: LngLat[]): Geometry {
    return {
        type: 'LineString',
        coordinates
    };
}

export function getFeatureStyle(color: string): DrawingStyle {
    return {
        stroke: [
            {
                color,
                width: 8,
                opacity: 0.8
            }
        ],
        simplificationRate: 0
    };
}
