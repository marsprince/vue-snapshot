import { cloneDeep } from 'lodash-es';
import Vue from 'vue';
import snapShot from './vue-snapshot';
import { routeQueryKey, updatedExcludes, stringify, parse, getRouteQuery, getFullPath } from './util';

const update = (vm, routeQuery) => {
  const dataVm = routeQuery[vm._uid];
  for (const k in dataVm) {
    vm[k] = dataVm[k];
  }
  vm.$children.forEach(item => {
    update(item, routeQuery);
  });
};

export function onUpdated() {
  addRouteQuery(this);
}

export function onActivated() {
  addRouteQueryChildren(this.$children[0]);
}

export const addRouteQueryChildren = (vm) => {
  addRouteQuery(vm);
  vm.$children.forEach(addRouteQueryChildren)
};

export const addActivated = (vm) => {
  let activated = vm.$options.activated;
  if (Array.isArray(activated)) {
    activated.push(onActivated);
  } else {
    vm.$options.activated = [onActivated];
  }
};

export const addUpdated = (vm) => {
  // 某些组件不需要触发Updated
  const isUpdate = updatedExcludes.every(cb => {
    return !cb(vm);
  });
  if (!isUpdate) {
    return;
  }
  let updated = vm.$options.updated;
  if (Array.isArray(updated)) {
    updated.push(onUpdated);
  } else {
    vm.$options.updated = [onUpdated];
  }
  if (vm.$children.length !== 0) {
    vm.$children.forEach(addUpdated);
  }
};

export const updateRouteQuery = (vm) => {
  const routeQuery = getRouteQuery(vm);
  if (routeQuery[routeQueryKey]) {
    // 存在则更新组件状态
    update(vm, parse(routeQuery[routeQueryKey]));
  } else {
    // 否则将当前组件状态更新至路由
    addRouteQuery(vm);
  }
};

export const addRouteQuery = (vm) => {
  const routeQuery = getRouteQuery(vm);
  if (!routeQuery[routeQueryKey]) {
    routeQuery[routeQueryKey] = stringify({});
  }
  const _ = parse(routeQuery[routeQueryKey]);
  _[vm._uid] = cloneDeep(vm.$data);
  routeQuery[routeQueryKey] = stringify(_);
  history.replaceState({}, '', getFullPath(vm.$route));
};

export const snapShotWrapper = (component, isAsync) => {
  const wrapper = Vue.extend({
    template: ' <wrapper>\n' +
      '    <contentComponent></contentComponent>\n' +
      '  </wrapper>',
    components: {
      'contentComponent': component,
      'wrapper': snapShot,
    },
  });
  return Vue.component('snapShowWrapper', wrapper);
};

