import request from '@/utils/request';
import qs from 'qs';

export function login(data) {
  return request('/v1/login', {
    method: 'POST',
    data: {
      ...data,
      client_secret: 'SrVvvdkugUtPh1F9s9e0rolXGGfFRo9OqfuUVkvy',
      client_id: '2',
      grant_type: 'password',
    },
    parse: true,
  });
}

export function me() {
  return request('/v1/me', {
    method: 'GET',
    params: {},
  });
}

export async function logout() {
  return request('/v1/logout', {
    method: 'POST',
    parse: true,
  });
}
