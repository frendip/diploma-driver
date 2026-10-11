import React from 'react';
import {Car} from '../types/cars.types';
import {ReactComponent as TruckDriverIcon} from '../assets/truck-driver-icon.svg';
import {useNavigate, useSearchParams} from 'react-router-dom';

interface DriverInfoPanelProps {
    className?: string;
    car: Car;
}

function DriverInfoPanel({className: externalStyles, car}: DriverInfoPanelProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div className={`${externalStyles} bg-white/85 p-3`}>
            <div className="flex items-center">
                <div
                    onClick={() => navigate(`/statistics/?driverId=${+searchParams.get('driverId')!}`)}
                    className="mr-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow"
                >
                    <TruckDriverIcon />
                </div>
                <div className="flex gap-x-3">
                    <div>
                        <div className="text-sm font-medium text-gray-500/75">Водитель</div>
                        <div className="font-medium">{car.driver_name}</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-500/75">Перевозимый генератор</div>
                        <div className="font-medium">{car.generator_name}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DriverInfoPanel;
