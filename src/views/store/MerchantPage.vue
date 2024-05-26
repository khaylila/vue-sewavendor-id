<template>
  <template v-if="!isLoading">
    <Navbar active="store" @searchItem="handleGetSearch" />
    <div class="container-fluid">
      <section id="main" style="min-height: 100vh" class="py-4">
        <PageHeader :title="merchant.merchant.name" :breadcrumb="breadcrumb" />
        <div class="shadow-sm">
          <div class="card rounded-0 border-0 color-gray-800">
            <div class="card-body color-secondary p-2">
              <CardList :itemList="merchant.items" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </template>
  <template v-else>
    <div class="loading-spinner">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </template>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import PageHeader from "../../components/PageHeader.vue";
import Footer from "../../components/Footer.vue";
import CardList from "../../components/CardList.vue";
import { API_URL } from "../../peripherals/Constans";
import { fetchData, showAlert } from "@/peripherals/Utils";

export default {
  name: "MerchantPage",
  components: { Navbar, Footer, CardList, PageHeader },
  data() {
    return {
      searchItem: "",
      merchant: [],
      isLoading: true,
      breadcrumb: [
        {
          name: "Store",
          link: "store",
          active: false,
        },
        {
          name: null,
          link: null,
          active: true,
        },
      ],
    };
  },
  methods: {
    handleGetSearch(search) {
      this.searchItem = search;
      this.isLoading = true;
      this.fetchItemsData();
    },
    fetchItemsMerchantData() {
      this.isLoading = true;
      fetchData(
        API_URL + "/" + this.$route.params.merchant,
        {
          method: "GET",
        },
        (result) => {
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.merchant = result.data;
            this.breadcrumb[1].name = result.data.merchant.name;
          }
        },
        (errors) => {
          console.log(errors);
          showAlert({
            text: errors,
          });
        },
        () => {
          this.isLoading = false;
        }
      );
    },
  },
  mounted() {
    this.fetchItemsMerchantData();
  },
  updated() {},
};
</script>

<style></style>
