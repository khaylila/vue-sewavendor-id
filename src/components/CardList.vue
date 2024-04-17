<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="(item, index) in itemList" :key="index" class="col-3 mb-3">
        <CardItem :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";
export default {
  name: "CardList",
  props: ["itemList"],
  components: { CardItem },
  methods: {},
};

// import { ref, defineProps, onUpdated, onUnmounted, onMounted } from "vue";
// import getItems from "@/api/getItems";
// import { useInfiniteScroll } from "@vueuse/core";
// import CardItem from "./CardItem.vue";

// const props = defineProps(["search"]);
// const search = ref(null);
// const listEl = ref(null);

// let canLoadMoreData = true;

// const items = await getItems(1, props.search);
// const itemList = ref(items.data);
// const itemPage = ref(items.page);

// const getItemsOnScroll = async () => {
//   itemPage.value.current = itemPage.value.current + 1;
//   const newItems = await getItems(itemPage.value.current, props.search);
//   if (newItems.data != null) {
//     itemList.value.push(...newItems.data);
//   }
//   if (itemPage.value.current >= itemPage.value.totalPage) {
//     canLoadMoreData = false;
//   }
// };

// useInfiniteScroll(
//   listEl,
//   async () => {
//     await getItemsOnScroll();
//   },
//   {
//     canLoadMore: () => false,
//   }
// );

// onMounted(() => {
//   console.log("mounted");
// });

// onUpdated(() => {
//   console.log("updated");
//   if (
//     props.search !== undefined &&
//     props.search !== null &&
//     props.search !== ""
//   ) {
//     if (props.search !== itemList.value) {
//       const fetchUpdateData = async () => {
//         const itemUpdate = await getItems(1, props.search);
//         itemList.value = itemUpdate.data;
//         itemPage.value = itemUpdate.page;
//       };

//       fetchUpdateData();

//       search.value != props.search;
//     }
//   }
// });

// onUnmounted(() => {
//   console.log("onUnmounted");
// });
</script>

<style></style>
