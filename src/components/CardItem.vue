<template>
  <div
    class="card w-100 hover-items"
    :title="item.name"
    style="min-height: 14rem"
    @click="handleItemClick(item)"
  >
    <img
      :src="item.images[0].title"
      class="card-img-top px-2"
      style="aspect-ratio: 16/9"
      alt="Items Preview"
    />
    <div class="card-body">
      <h5 class="card-title">{{ item.name }}</h5>
      <h6 class="card-subtitle">Rp {{ item.price }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: ["item", "reload"],
  methods: {
    handleItemClick(item) {
      if (this.reload == true) {
        this.$router
          .push({
            name: "store-detail",
            params: { merchant: item.merchant.slug, itemSlug: item.slug },
          })
          .then(() => this.$router.go(0));
      } else {
        this.$router.push({
          name: "store-detail",
          params: { merchant: item.merchant.slug, itemSlug: item.slug },
        });
      }
    },
  },
};
</script>

<style></style>
