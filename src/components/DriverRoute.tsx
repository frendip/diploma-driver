import {useMemo} from 'react';
import type {LngLat} from '../lib/ymaps';
import {YMapFeature} from '../lib/ymaps';
import type {RouterData} from '../types/map.types';
import {findNearestIndex} from '../utils/math.utils';
import {getFeatureCoordinates, getFeatureGeometry, getFeatureStyle} from '../utils/map.util';

interface DriverRouteProps {
    route: RouterData;
    driverCoordinates?: LngLat;
}

function DriverRoute({route, driverCoordinates}: DriverRouteProps) {
    const routeFeatures = useMemo(() => {
        const nearIndexToDriver = driverCoordinates ? findNearestIndex(route.points, driverCoordinates) : 0;
        return {
            remaining: {
                geometry: getFeatureGeometry(getFeatureCoordinates(route.points, nearIndexToDriver, true)),
                style: getFeatureStyle('#5932EA')
            },
            past: {
                geometry: getFeatureGeometry(getFeatureCoordinates(route.points, nearIndexToDriver)),
                style: getFeatureStyle('#808080')
            }
        };
    }, [route, driverCoordinates]);

    return (
        <>
            <YMapFeature geometry={routeFeatures.remaining.geometry} style={routeFeatures.remaining.style} />
            <YMapFeature geometry={routeFeatures.past.geometry} style={routeFeatures.past.style} />
        </>
    );
}

export default DriverRoute;
