import {LngLat} from '../lib/ymaps';

export function calculateAngle(currentPosition: LngLat, nextPosition: LngLat): number {
    const [x1, y1] = currentPosition;
    const [x2, y2] = nextPosition;

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const angleInRadians = Math.atan2(deltaY, deltaX);

    const adjustedAngleInRadians = angleInRadians - Math.PI / 2;

    return (adjustedAngleInRadians + 2 * Math.PI) % (2 * Math.PI);
}

export function findDistance(point1: LngLat, point2: LngLat) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function findNearestIndex(route: LngLat[], targetPoint: LngLat) {
    let nearestIndex = -1;
    let minDistance = Infinity;

    route.forEach((point, index) => {
        const distance = findDistance(point, targetPoint);

        if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = index;
        }
    });

    return Math.max(nearestIndex, 0);
}
