import React from 'react';
import {CarRoute} from '../types/cars.types';
import CommonButton from './UI/CommonButton';

interface RoutePanelProps {
    onClickHandler: () => void;
    routeData: CarRoute;
    progress: {
        remainTime: number;
        remainDistance: number;
    };
    isDrivingMode: boolean;
}

function RoutePanel({progress, onClickHandler, routeData, isDrivingMode}: RoutePanelProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-50 flex h-[220px] flex-col items-center gap-y-2 bg-white/85 py-3">
            <div className="flex items-center gap-x-8 rounded-xl border border-gray-400 bg-white px-4 py-1">
                <div>
                    <div className="text-sm text-gray-500">время</div>
                    <div className="text-lg">{progress.remainTime} мин</div>
                </div>
                <div className="h-[30px] w-px border-l border-gray-400" />
                <div>
                    <div className="text-sm text-gray-500">расстояние</div>
                    <div className="text-lg">{progress.remainDistance} км</div>
                </div>
            </div>
            <div className="flex max-w-72 flex-col rounded-xl bg-[#e7e7e7] px-4 py-2">
                <div className="flex items-center gap-x-5">
                    <span className="h-3 w-4 rounded-full bg-blue-500"></span>
                    <span className="e truncate text-base font-medium">{routeData.start_substation.address}</span>
                </div>
                <div className="ml-[5px] h-4 border-l-2 border-dashed border-gray-400/50" />
                <div className="flex items-center gap-x-5">
                    <span className="h-3 w-4 rounded-full bg-red-500"></span>
                    <span className="truncate text-base font-medium">{routeData.end_substation.address}</span>
                </div>
            </div>
            <CommonButton
                disabled={isDrivingMode}
                onClick={onClickHandler}
                text={isDrivingMode ? 'В пути...' : 'В путь'}
            />
        </div>
    );
}

export default RoutePanel;
