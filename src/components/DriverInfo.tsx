import React, {useEffect, useState} from 'react';
import {Car} from '../types/cars.types';
import {useGetSubstationByIdQuery} from '../api/SubstationsService';
import {ReactComponent as TruckDriverIcon} from '../assets/truck-driver-icon.svg';
import {ReactComponent as PenIcon} from '../assets/pen-icon.svg';
import CommonButton from './UI/CommonButton';
import IconButton from './UI/IconButton';

interface DriverInfoProps {
    car: Car;
}

const statusColorOption = {
    onBase: 'text-green-500',
    inWork: 'text-orange-300',
    delivered: 'text-indigo-600'
} as const;

const translateOption = {
    onBase: 'На базе',
    inWork: 'В работе',
    delivered: 'В пути'
};

function DriverInfo({car}: DriverInfoProps) {
    const {data: baseData} = useGetSubstationByIdQuery(car.base_id);

    // Жесткие костыли для демонстрации
    const [localCar, setLocalCar] = useState(car);
    const [localBase, setLocalBase] = useState(baseData?.data);
    const [localNumber, setLocalNumber] = useState('+7 (000) 000-00-00');
    const [localMail, setLocalMail] = useState('driver@example.com');

    useEffect(() => {
        if (baseData) {
            setLocalBase(baseData.data);
        }
    }, [baseData]);

    const [isEdit, setIsEdit] = useState(false);

    const onClickHandler = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <div className="flex w-full flex-col gap-y-7">
            <div className="flex flex-col items-center">
                <TruckDriverIcon width={100} height={100} className="mb-2" />
                <div className="relative">
                    <div className="text-xl font-medium">{localCar.driver_name}</div>
                    <div className="absolute -right-9 top-0">
                        <IconButton IconComponent={PenIcon} />
                    </div>
                    <div className={`${statusColorOption[localCar.status]} text-center text-lg`}>
                        {translateOption[localCar.status]}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <div className="mb-1 self-center text-2xl font-medium">Данные</div>
                <div className="flex gap-x-2 font-medium">
                    <span className="text-gray-500/75">Перевозимый генератор:</span>
                    <span>{localCar.generator_name}</span>
                </div>
                <div className="flex gap-x-2 font-medium">
                    <span className="text-gray-500/75">Мощность перевозимого генератор:</span>
                    <span>{localCar.generator_power} кВт</span>
                </div>
                <div className="flex gap-x-2 font-medium">
                    <span className="text-gray-500/75">Местоположение:</span>
                    <span className="truncate">{localBase?.address}</span>
                </div>
                <div className="flex gap-x-2 font-medium">
                    <span className="text-gray-500/75">База:</span>
                    <span className="truncate">{localBase?.name}</span>
                </div>
                <div className="flex gap-x-2 font-medium">
                    <span className="text-gray-500/75">Номер:</span>
                    <span>{localNumber}</span>
                </div>
                <div className="flex gap-x-2 font-medium">
                    <span className="text-gray-500/75">Email:</span>
                    <span>{localMail}</span>
                </div>
            </div>
        </div>
    );
}

export default DriverInfo;
