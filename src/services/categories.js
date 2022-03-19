import request from '@/utils/request';
// import { omit } from 'lodash';
// import { Helper, variables } from '@/utils';

export function getStayOfTypes(params = {}) {
  return request('/v1/stay-of-types', {
    method: 'GET',
    params,
  });
}

export function getRoomTypes(params = {}) {
  return request('/v1/room-types', {
    method: 'GET',
    params,
  });
}

export function getCities(params = {}) {
  return request('/v1/cities', {
    method: 'GET',
    params,
  });
}

export function getNations(params = {}) {
  return request('/v1/nations', {
    method: 'GET',
    params,
  });
}

export function getConvenients(params = {}) {
  return request('/v1/convenients', {
    method: 'GET',
    params,
  });
}

export function getUtilities(params = {}) {
  return request('/v1/utilities', {
    method: 'GET',
    params,
  });
}

export function getAdditionalPrices(params = {}) {
  return request('/v1/additional-prices', {
    method: 'GET',
    params,
  });
}

export function getServicePackTypes(params = {}) {
  return request('/v1/service-pack-types', {
    method: 'GET',
    params,
  });
}

export function getStayOfPlaces(params = {}) {
  return request('/v1/stay-of-places', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
