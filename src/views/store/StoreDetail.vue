<template>
  <template v-if="!isLoading">
    <Navbar active="store" />
    <div class="container">
      <section id="main" style="min-height: 100vh" class="py-4">
        <!-- body -->
        <div class="shadow-sm">
          <div class="card rounded-0 border-0 color-gray-800">
            <div class="card-body color-secondary">
              <!-- breadcrumb -->
              <div class="row">
                <div class="col-12">
                  <nav
                    style="--bs-breadcrumb-divider: '>'"
                    aria-label="breadcrumb"
                  >
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <router-link
                          class="navbar-brand"
                          :to="{
                            name: 'merchant-detail',
                            params: { merchant: item.merchant?.slug },
                          }"
                          >{{ item.merchant?.name }}</router-link
                        >
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        {{ item.name }}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <!-- body -->
              <div class="row">
                <div class="col-md-4">
                  <img
                    :src="previewItem"
                    alt="Preview Items"
                    class="rounded img-thumbnail w-100"
                    style="aspect-ratio: 1/1"
                  />
                  <div class="d-flex flex-row mb-3">
                    <img
                      v-for="(image, index) in item.images"
                      :key="index"
                      :src="image.title"
                      alt="Preview Item"
                      style="aspect-ratio: 1/1; width: 50px"
                      class="border rounded p-1 my-2"
                      @click="handlePreviewItems(image)"
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  <h3>
                    {{ item.name }}
                  </h3>
                  <p class="d-flex align-items-center">
                    <span
                      >Tersewa
                      <span class="text-body-tertiary">{{
                        item.rent
                      }}</span></span
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-dot"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    </svg>
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="yellow"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                        style="margin-top: -5px"
                      >
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                      </svg>
                      {{ item.rating }}
                      <span class="text-body-tertiary"
                        >({{ item.user_rating }} rating)</span
                      ></span
                    >
                  </p>
                  <h2>
                    <strong>Rp{{ item.price }}</strong>
                  </h2>
                  <h6 class="text-body-tertiary">Deskripsi Produk:</h6>
                  <p style="min-height: 200px">
                    {{ item.description }}
                  </p>
                  <hr />
                  <router-link
                    :to="{
                      name: 'merchant-detail',
                      params: { merchant: item.merchant?.slug },
                    }"
                    class="navbar-brand d-flex align-items-center"
                  >
                    <img
                      :src="item.merchant?.avatar"
                      alt="Merchant Avatar"
                      style="width: 40px"
                      class="m-2"
                    />
                    <div>
                      <span class="d-block fw-bold">{{
                        item.merchant?.name
                      }}</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="yellow"
                          class="bi bi-star"
                          viewBox="0 0 16 16"
                          style="margin-top: -5px"
                        >
                          <path
                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
                          />
                        </svg>
                        {{ item.merchant?.rating }}
                        <small>Rata-rata ulasan</small></span
                      >
                    </div>
                  </router-link>
                </div>
                <div class="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title fw-bmr-2 old">
                        Atur jumlah dan tanggal sewa
                      </h5>
                      <div class="form-floating mb-2">
                        <input
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': errors.datestart }"
                          id="dateStart"
                          v-model="range.start"
                          @change="handleChangeDate"
                        />
                        <label for="dateStart">Tanggal Mulai</label>
                        <div v-if="errors.datestart" class="invalid-feedback">
                          {{ errors.datestart }}
                        </div>
                      </div>

                      <div class="form-floating mb-2">
                        <input
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': errors.dateend }"
                          id="dateEnd"
                          v-model="range.end"
                          @change="handleChangeDate"
                        />
                        <label for="dateEnd">Tanggal Selesai</label>
                        <div v-if="errors.dateend" class="invalid-feedback">
                          {{ errors.dateend }}
                        </div>
                      </div>
                      <div class="form-floating mb-3">
                        <textarea
                          class="form-control h-100"
                          :class="{ 'is-invalid': errors.address }"
                          placeholder="Alamat tujuan sewa"
                          id="inputAddress"
                          rows="3"
                          style="resize: none"
                          v-model="address"
                        ></textarea>
                        <label for="inputAddress">Alamat</label>
                        <div v-if="errors.address" class="invalid-feedback">
                          {{ errors.address }}
                        </div>
                      </div>
                      <div class="row align-items-center mb-3">
                        <div class="col-8">
                          <div class="input-group has-validation">
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                              @click="handleQtyDe"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              :class="{ 'is-invalid': errors.qty }"
                              class="form-control text-center"
                              placeholder="0"
                              v-model="qtyItem"
                              readonly
                            />
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                              @click="handleQtyIn"
                            >
                              +
                            </button>
                            <div v-if="errors.qty" class="invalid-feedback">
                              {{ errors.qty }}
                            </div>
                          </div>
                        </div>
                        <div class="col-4 d-flex align-items-center">
                          Stok:
                          <template v-if="checkStock">
                            <div class="ms-2 spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </template>
                          <template v-else
                            ><strong>{{ item.qty }}</strong>
                          </template>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center mb-4"
                      >
                        <span class="text-body-tertiary">Subtotal</span>
                        <h5 class="fw-bold">Rp{{ total }}</h5>
                      </div>

                      <!-- <button
                        class="btn btn-success w-100 mb-2"
                        :disabled="checkStock"
                      > -->
                      <!-- + Keranjang -->
                      <!-- </button> -->
                      <button
                        v-if="!rentIsloading"
                        class="btn btn-outline-success w-100"
                        @click="handleRentItem"
                        :disabled="checkStock"
                      >
                        Sewa Langsung
                      </button>
                      <button
                        v-else
                        type="button"
                        class="btn btn-outline-success w-100"
                        disabled
                      >
                        <span
                          class="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        >
                        </span>
                        <span role="status">Loading...</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="mb-4" />
              <!-- items -->
              <!-- lainnya di toko ini -->
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="fw-bold mb-3">Lainnya dari toko ini</h4>
                <router-link
                  :to="{
                    name: 'merchant-detail',
                    params: { merchant: item.merchant?.slug },
                  }"
                  >Lihat semua</router-link
                >
              </div>
              <div class="row mb-4">
                <div
                  v-for="(item, index) in merchantItems"
                  :key="index"
                  class="col-md-3"
                >
                  <CardItem :item="item" :reload="true" />
                </div>
              </div>
              <!-- <hr class="mb-4" /> -->
              <!-- produk sejenis -->
              <!-- <div class="d-flex align-items-center justify-content-between">
                <h4 class="fw-bold mb-3">Produk yang sejenis</h4>
                <router-link
                  :to="{
                    name: 'merchant-detail',
                    params: { merchant: item.merchant?.slug },
                  }"
                  >Lihat semua</router-link
                >
              </div> -->
              <!-- <div class="row mb-4">
                <div
                  v-for="(item, index) in merchantItems"
                  :key="index"
                  class="col-md-3"
                >
                  <CardItem :item="item" :reload="true" />
                </div>
              </div> -->
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
import Footer from "../../components/Footer.vue";
import CardItem from "../../components/CardItem.vue";
import {
  AUTHORIZATION,
  API_URL,
  PAYMENT,
  ITEMS_CHECKDATE,
} from "../../peripherals/Constans";
import { fetchData, showAlert } from "@/peripherals/Utils";
export default {
  name: "StoreDetail",
  components: { Navbar, Footer, CardItem },
  data() {
    return {
      checkStock: false,
      isLoading: false,
      total: 0,
      qtyItem: 1,
      address: "",
      range: {
        start: "",
        end: "",
      },
      errors: {
        address: "",
        date_start: "",
        date_end: "",
        qty: "",
      },
      rentIsloading: false,
      item: {},
      previewItem: "",
      merchantItems: {},
    };
  },
  methods: {
    handlePreviewItems(image) {
      this.previewItem = image.title;
    },
    handleQtyIn() {
      if (this.qtyItem > this.item.qty) {
        this.qtyItem = this.item.qty;
      }
      if (this.qtyItem < this.item.qty) {
        this.qtyItem++;
      }
      this.total = this.qtyItem * this.item.price;
    },
    handleQtyDe() {
      if (this.qtyItem <= 0) {
        this.qtyItem = 0;
      }
      if (this.qtyItem > 0) {
        this.qtyItem--;
      }
      this.total = this.qtyItem * this.item.price;
    },
    fetchItems() {
      this.isLoading = true;
      fetchData(
        `${API_URL}/${this.$route.params.merchant}/${this.$route.params.itemSlug}`,
        {
          method: "GET",
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.item = result.data;
            this.total = result.data.price;
            this.previewItem = result.data.images[0].title;
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
    fetchItemsMerchant() {
      fetchData(
        `${API_URL}/${this.$route.params.merchant}?limit=4`,
        {
          method: "GET",
        },
        (result) => {
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.merchantItems = result.data.items;
          }
        },
        (errors) => {
          showAlert({
            text: errors,
          });
        },
        () => {}
      );
    },
    handleRentItem() {
      this.errors = {
        address: "",
        datestart: "",
        dateend: "",
        qty: "",
      };
      if (AUTHORIZATION == null) {
        showAlert({
          title: "Ooops!",
          text: "Login terlebih dahulu untuk melanjutkan.",
          icon: "info",
          confirmButtonText: "Oke",
        });
      } else {
        this.rentIsloading = true;
        fetchData(
          PAYMENT,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: AUTHORIZATION,
            },
            body: {
              dateStart: this.range.start,
              dateEnd: this.range.end,
              qty: this.qtyItem,
              address: this.address,
              merchantSlug: this.$route.params.merchant,
              itemSlug: this.$route.params.itemSlug,
            },
            method: "POST",
          },
          (result) => {
            console.log(result);
            if (result.code == "400") {
              this.errors = { ...this.errors, ...result.errors };
            } else if (result.code == "200" || result.code == "201") {
              window.location.replace(result.data.snap_url);
            } else {
              console.log(result.error);
              console.log(result.error.message);
              this.showAlert({
                text: result.error.message,
              });
            }
          },
          (error) => {
            showAlert();
          },
          () => {
            this.rentIsloading = false;
          }
        );
      }
    },
    handleChangeDate() {
      this.errors = { ...this.errors, datestart: "", dateend: "" };
      if (this.range.start == "" || this.range.end == "") {
        if (this.range.start == "") {
          this.errors.datestart = "Isi tanggal mulai terlebih dahulu.";
        }
        if (this.range.end == "") {
          this.errors.dateend = "Isi tanggal selesai terlebih dahulu.";
        }
      } else {
        const dateStartTS = new Date(this.range.start).getTime() / 1000;
        const dateEndTS = new Date(this.range.end).getTime() / 1000;
        if (dateStartTS > dateEndTS) {
          this.errors.datestart =
            "Tanggal mulai harus lebih kecil atau sama tanggal selesai.";
        } else {
          this.checkStock = true;
          fetchData(
            `${ITEMS_CHECKDATE}?`,
            {
              method: "GET",
              body: {
                merchantSlug: this.$route.params.merchant,
                itemSlug: this.$route.params.itemSlug,
                dateStart: this.range.start,
                dateEnd: this.range.end,
              },
            },
            (result) => {
              console.log(result);
              if (result.code != 200) {
                showAlert({
                  text: result.error.message,
                });
              } else {
                this.item.qty = result.data.item_qty;
              }
            },
            (errors) => {
              showAlert({
                text: errors,
              });
            },
            () => {
              this.checkStock = false;
            }
          );
        }
      }
      console.log(this.errors);
      console.log(this.range);
    },
  },
  mounted() {
    this.fetchItems();
    this.fetchItemsMerchant();
  },
};
</script>

<style></style>
