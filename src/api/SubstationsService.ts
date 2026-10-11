import type {BasesResp, SubstationResp} from '../types/substations.types';
import {ApiService} from './ApiService';

const SUBSTATION_URL = '/substations';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstationById: builder.query<SubstationResp, number>({
            query: (id) => ({url: `${SUBSTATION_URL}/${id}`, method: 'get'}),
            providesTags: ['Substations']
        }),
        getBases: builder.query<BasesResp, null>({
            query: () => ({url: `${SUBSTATION_URL}/bases`, method: 'get'}),
            providesTags: ['Bases']
        })
    })
});

export const {useGetBasesQuery, useGetSubstationByIdQuery} = SubstationsApi;
