import queryString from 'query-string';

export const routeQueryKey = '_';
export const updatedExcludes = [(vm) => {
  return vm.$vnode.componentOptions.tag === 'router-link';
}];

const stringifyQuery = (obj) => {
  const encodeReserveRE = /[!'()*]/g;
  const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16);
  const commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
  const encode = str => encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ',');
  const res = obj ? Object.keys(obj).map(key => {
    const val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      const result = [];
      val.forEach(val2 => {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(x => x.length > 0).join('&') : null;
  return res ? `?${res}` : '';
};

export const isDef = (v) => {
  return v !== undefined && v !== null;
}

// 获得所有query对象
export const getRouteQuery = (vm) => {
  const parsed = queryString.parse(location.search || location.hash.split('?')[1]);
  return vm.$route ? vm.$route.query : parsed;
};

// 获得完整路径
export const getFullPath = ({ path, query = {}, hash = '' }) => {
  return (path || '/') + stringifyQuery(query) + hash;
};

export const parse = (routeQuery) => {
  return JSON.parse(routeQuery);
};

export const stringify = (obj) => {
  return JSON.stringify(obj);
};
