import request from '@/utils/request';
import { Helper, variables } from '@/utils';

export function getRoles(_params = {}) {
  return request('/v1/roles', {
    method: 'GET',
    params: {
      orderBy: 'id',
      sortedBy: 'desc',
    },
  });
}

export function add(data = {}) {
  return request('/v1/users', {
    method: 'POST',
    data: {
      ...data,
      date_of_birth: Helper.getDateTime({
        value: Helper.setDate({
          ...variables.setDateData,
          originValue: data.date_of_birth,
        }),
        format: variables.DATE_FORMAT.DATE_AFTER,
        isUTC: false,
      }),
    },
  });
}

export function update(data = {}) {
  return request(`/v1/users/${data.id}`, {
    method: 'PUT',
    data: {
      ...data,
      date_of_birth: Helper.getDateTime({
        value: Helper.setDate({
          ...variables.setDateData,
          originValue: data.date_of_birth,
        }),
        format: variables.DATE_FORMAT.DATE_AFTER,
        isUTC: false,
      }),
    },
  });
}

export function details(params = {}) {
  return request(`/v1/users/${params.id}`, {
    method: 'GET',
    params: {
      ...params,
      include: 'role',
    },
  });
}
