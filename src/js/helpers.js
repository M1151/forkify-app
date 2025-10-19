import { TIMEOUT_SEC } from './config';

const timeOut = function () {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(`time out in ${TIMEOUT_SEC} seconds`);
    }, TIMEOUT_SEC * 1000);
  });
};

export const AJAX = async function (url, data = undefined) {
  try {
    const fetchPro = data
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeOut()]);

    if (!res) return;
    return await res.json();
  } catch (err) {
    throw err;
  }
};
