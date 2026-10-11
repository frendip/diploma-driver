import React, {useEffect, useMemo, useRef, useState} from 'react';
import MapLayout from '../components/MapLayout';
import {LngLat, Margin} from '../lib/ymaps';
import MapDriverMarker from '../components/MapDriverMarker';
import {mockDrive} from '../utils/mockNavigation';
import {DEFAULT_LOCATION} from '../components/MapLayout';
import {calculateAngle, findNearestIndex} from '../utils/math.utils';
import {useSearchParams} from 'react-router-dom';
import {useGetCarByIdQuery, useGetCarRouteQuery, useUpdateCarMutation} from '../api/CarsService';
import RoutePanel from '../components/RoutePanel';
import DriverInfoPanel from '../components/DriverInfoPanel';
import DriverRoute from '../components/DriverRoute';
import {bbox} from '../utils/map.util';

const MAP_MARGIN: Margin = [0, 25, 200, 25];

function Map() {
    const navigatorWatchIdRef = useRef<number | null>(null);

    const [searchParams] = useSearchParams();

    const {data: driverData} = useGetCarByIdQuery(+searchParams.get('driverId')!);
    const {data: driverRouteData} = useGetCarRouteQuery(+searchParams.get('driverId')!, {
        // убрать пулинг и перевести на сокеты
        pollingInterval: 1000
    });

    const [updateCar] = useUpdateCarMutation();

    const [mapLocation, setMapLocation] = useState(DEFAULT_LOCATION);
    const [driverCoordinates, setDriverCoordinates] = useState<[LngLat, LngLat] | null>(null);
    const [mapAzimuth, setMapAzimuth] = useState(0);
    const [mapTilt, setMapTilt] = useState(0);
    const [isDrivingMode, setIsDrivingMode] = useState(false);

    const watchPositionHandler = (position: GeolocationPosition) => {
        const coordinates: LngLat = [position.coords.longitude, position.coords.latitude];
        updateCar({car_id: +searchParams.get('driverId')!, carWithoutId: {...driverData!, coordinates}});

        setDriverCoordinates((prevState) => {
            setMapAzimuth((prevAz) => {
                const newAz = calculateAngle(prevState![1], coordinates);

                if (Math.abs(prevAz - newAz) > 0.1) {
                    return newAz;
                }

                return prevAz;
            });
            return [prevState![1], coordinates];
        });

        setMapLocation({...mapLocation, zoom: 19, center: coordinates});
    };

    useEffect(() => {
        if (driverData) {
            setDriverCoordinates([driverData.coordinates, driverData.coordinates]);
            setMapLocation({...DEFAULT_LOCATION, center: driverData.coordinates});
        }
    }, [driverData]);

    useEffect(() => {
        if (navigatorWatchIdRef.current === null) {
            navigatorWatchIdRef.current = navigator.geolocation.watchPosition(watchPositionHandler);
        }

        return () => {
            if (navigatorWatchIdRef.current !== null) {
                navigator.geolocation.clearWatch(navigatorWatchIdRef.current);
                navigatorWatchIdRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [driverData]);

    useEffect(() => {
        if (driverRouteData && !isDrivingMode) {
            const bounds = bbox(driverRouteData.route.points);
            setMapLocation((prevLocation) => ({...prevLocation, bounds}));
        }
    }, [driverRouteData, isDrivingMode]);

    const onClickHandler = () => {
        if (driverRouteData) {
            setMapTilt((60 * Math.PI) / 180);
            mockDrive(driverRouteData.route.points);
            setIsDrivingMode(true);
        }
    };

    const progress = useMemo(() => {
        if (driverRouteData && driverCoordinates) {
            const driverIndex = findNearestIndex(driverRouteData.route.points, driverCoordinates[0]);
            const progress = 1 - driverIndex / driverRouteData.route.points.length;

            const fullTime = driverRouteData.route.duration / 60;
            const remainTime = +(fullTime * progress).toFixed(0);

            const fullDistance = driverRouteData.route.distance / 1000;
            const remainDistance = +(fullDistance * progress).toFixed(1);

            return {
                remainTime,
                remainDistance
            };
        }
        return {
            remainTime: 0,
            remainDistance: 0
        };
    }, [driverRouteData, driverCoordinates]);

    return (
        <div className="absolute bottom-0 left-0 right-0 top-0">
            <MapLayout
                location={mapLocation}
                margin={MAP_MARGIN}
                camera={{tilt: mapTilt, azimuth: mapAzimuth, duration: 300}}
            >
                {driverData && driverRouteData && (
                    <DriverRoute route={driverRouteData.route} driverCoordinates={driverCoordinates![0]} />
                )}

                {driverCoordinates && <MapDriverMarker coordinates={driverCoordinates![0]} />}

                {driverData && (
                    <DriverInfoPanel className="absolute left-0 right-0 top-0 z-50 h-[75px]" car={driverData} />
                )}
                {driverRouteData && (
                    <RoutePanel
                        isDrivingMode={isDrivingMode}
                        progress={progress}
                        routeData={driverRouteData}
                        onClickHandler={onClickHandler}
                    />
                )}
            </MapLayout>
        </div>
    );
}

export default Map;
