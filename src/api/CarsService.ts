import {Car, CarResp, CarRoute, CarRouteResp} from '../types/cars.types';
import {RawResp} from '../types/resp.types';
import {ApiService} from './ApiService';
const CARS_URl = '/cars';

export const CarsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getCarById: builder.query<Car, number>({
            query: (id) => ({url: `${CARS_URl}/${id}`, method: 'get'}),
            providesTags: ['Cars'],
            transformResponse: (resp: CarResp) => resp.data
        }),
        getCarRoute: builder.query<CarRoute, number>({
            query: (id) => ({url: `${CARS_URl}/${id}/route`, method: 'get'}),
            providesTags: ['Cars', 'Substations', 'Route'],
            transformResponse: (resp: CarRouteResp) => resp.data
        }),
        updateCar: builder.mutation<RawResp, {car_id: number; carWithoutId: Omit<Car, 'car_id'>}>({
            query: ({car_id, carWithoutId}) => ({url: `${CARS_URl}/${car_id}`, body: carWithoutId, method: 'PUT'})
        })
    })
});

export const {
    useGetCarByIdQuery,
    useGetCarRouteQuery,
    useLazyGetCarRouteQuery,
    useLazyGetCarByIdQuery,
    useUpdateCarMutation
} = CarsApi;
