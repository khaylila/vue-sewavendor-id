<template>
  <nav aria-label="Merchant Pagination">
    <ul class="pagination justify-content-end">
      <li v-if="hasPrev" class="page-item">
        <a class="page-link" :href="url + '?page=' + page?.current - 1"
          >Previous</a
        >
      </li>
      <li v-if="hasPrev" class="page-item">
        <a class="page-link" :href="url + '?page=' + page?.current - 1">{{
          page?.current - 1
        }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link active"
          :href="url + '?page=' + page?.current"
          @click.prevent="handleClickPagintaion($event.target.href)"
          >{{ page?.current }}</a
        >
      </li>
      <li v-if="hasNext" class="page-item">
        <a class="page-link" :href="url + '?page=' + page?.current + 1">{{
          page?.current + 1
        }}</a>
      </li>
      <li v-if="hasNext" class="page-item">
        <a class="page-link" :href="url + '?page=' + page?.current + 1">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { MERCHANT } from "../peripherals/Constans";

export default {
  name: "Pagination",
  props: ["page", "link"],
  data() {
    return {
      hasPrev: false,
      hasNext: false,
      url: MERCHANT,
    };
  },
  methods: {
    handleClickPagintaion(url) {
      console.log("pagination");
      this.$emit("linkClicked", url + "&");
    },
  },
  mounted() {
    if (this.link == "MERCHANT") {
      this.url = MERCHANT;
    }
    if (this.page?.current != 1) {
      this.hasPrev = true;
    }
    if (this.page?.current < this.page?.totalPage) {
      this.hasNext = true;
    }
  },
};
</script>

<style></style>
