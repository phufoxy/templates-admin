import request from '@/utils/request';

export function getNations(_params = {}) {
  return request('/v1/nations', {
    method: 'GET',
    params: {
      orderBy: 'id',
      sortedBy: 'desc',
    },
  });
}

export function add(data = {}) {
  return request('/v1/cities', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/cities/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/cities/${params.id}`, {
    method: 'GET',
    params,
  });
}
