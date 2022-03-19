import request from '@/utils/request';
import { isArray } from 'lodash';

export const upload = (files) => {
  const formData = new FormData();

  if (isArray(files)) {
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  } else {
    formData.append('file', files);
  }

  return request(`/v1/upload`, {
    method: 'POST',
    data: formData,
    parse: true,
  });
};
