import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
//@ts-ignore
import faker from 'faker';
import {useGetCarByIdQuery} from '../api/CarsService';
import {useNavigate, useSearchParams} from 'react-router-dom';
import DriverInfoPanel from '../components/DriverInfoPanel';
import DriverInfo from '../components/DriverInfo';
import {size} from 'lodash';
import CommonButton from '../components/UI/CommonButton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Количество выездов на сломанные подстанции'
        }
    }
};

const labels = ['10.06', '11.06', '12.06', '13.06', '14.06'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            data: labels.map(() => faker.datatype.number({min: 0, max: 3})),
            borderColor: '#5932EA',
            backgroundColor: 'rgba(89, 50, 234, 0.5)'
        }
    ]
};

function Statistics() {
    const [searchParams] = useSearchParams();
    const {data: driverData} = useGetCarByIdQuery(+searchParams.get('driverId')!);

    const navigate = useNavigate();

    return (
        <div className="flex flex-col p-5">
            {driverData && <DriverInfo car={driverData} />}
            <div className="mb-2 mt-4 self-center text-center text-2xl font-medium">Статистика</div>
            <div className="flex gap-x-2 font-medium">
                <div className="text-gray-500/75">Ср. дистанция маршрута:</div>
                <div>23.4 км</div>
            </div>
            <div className="flex gap-x-2 font-medium">
                <div className="text-gray-500/75">Ср. время в пути:</div>
                <div>31 мин</div>
            </div>
            <div className="mb-16">
                <Line options={options} data={data} />
            </div>

            <div className="self-center">
                <CommonButton
                    text="Вернуться на карту"
                    onClick={() => navigate(`/?driverId=${+searchParams.get('driverId')!}`)}
                />
            </div>
        </div>
    );
}

export default Statistics;
