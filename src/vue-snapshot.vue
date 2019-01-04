<script>
  import { getFirstComponentChild } from './get-first-component-child';
  import { addUpdated, addActivated, updateRouteQuery } from './index';

  export default {
    name: 'vue-snapshot',
    abstract: true,
    render(h) {
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      setTimeout(() => {
        if (vnode.componentInstance) {
          const vm = vnode.componentInstance;
          updateRouteQuery(vm);
          addUpdated(vm);
          addActivated(vm.$parent)
        }
      }, 0);
      return slot && slot[0];
    },
  };
</script>

