<template>
  <Navbar active="store" @searchItem="handleGetSearch" />
  <div class="container-fluid">
    <section id="main" style="min-height: 100vh" class="py-4">
      <div class="shadow-sm">
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-body color-secondary p-2">
            <template v-if="isLoading">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </template>
            <template v-else>
              <CardList :itemList="itemList" />
            </template>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import CardList from "../../components/CardList.vue";
import { ITEMS } from "../../peripherals/Constans";
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
} from "@/peripherals/Utils";

export default {
  name: "StoreView",
  components: { Navbar, Footer, CardList },
  data() {
    return {
      searchItem: "",
      itemList: [],
      isLoading: true,
    };
  },
  methods: {
    handleGetSearch(search) {
      this.searchItem = search;
      this.isLoading = true;
      this.fetchItemsData();
    },
    fetchItemsData() {
      fetchData(
        ITEMS + "?",
        {
          method: "GET",
          body: {
            search: this.searchItem,
          },
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.itemList = result.data;
          }
        },
        (errors) => {
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
    this.fetchItemsData();
  },
  updated() {},
};
</script>

<style></style>
