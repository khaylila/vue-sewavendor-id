<template>
  <div
    class="bg-white shadow-sm p-3 d-lg-flex justify-content-between mb-3 align-items-end"
  >
    <h2>{{ title }}</h2>
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item active small"
        v-for="item in breadcrumb"
        :key="item"
      >
        <template v-if="!item.active">
          <router-link :to="{ name: item.link }">
            {{ item.name }}
          </router-link>
        </template>
        <template v-else>{{ item.name }}</template>
      </li>
      <!-- <li class="breadcrumb-item active small" aria-current="page">
        Dashboard
      </li> -->
    </ol>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["title", "breadcrumb"],
};
</script>

<style></style>
