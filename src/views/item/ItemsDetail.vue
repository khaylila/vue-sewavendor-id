<template>
  <Navbar active="items" />
  <div class="container">
    <section id="main" style="min-height: 100vh" class="py-4">
      <!-- header -->
      <PageHeader title="Detail Items" :breadcrumb="breadcrumb" />
      <!-- body -->
      <div class="shadow-sm">
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-body color-secondary">
            <div class="row">
              <div class="col-md-8">
                <!-- card -->
                <div class="card my-3">
                  <div class="card-body">
                    <h5 class="card-title">Order Summary</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      On Going
                    </h6>
                    <table class="table mb-4">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tgl Mulai</th>
                          <th scope="col">Tgl Selesai</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Nilai Kontrak</th>
                          <th scope="col">Pemesan</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center" colspan="7">
                            Belum ada project yang ditambahkan.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      Not Started
                    </h6>
                    <table class="table mb-4">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tgl Mulai</th>
                          <th scope="col">Tgl Selesai</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Nilai Kontrak</th>
                          <th scope="col">Pemesan</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center" colspan="7">
                            Belum ada project yang ditambahkan.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      Completed
                    </h6>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tgl Mulai</th>
                          <th scope="col">Tgl Selesai</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Nilai Kontrak</th>
                          <th scope="col">Pemesan</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center" colspan="7">
                            Belum ada project yang ditambahkan.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row mb-3">
                  <div class="col-12 mb-3 d-flex justify-content-center">
                    <img
                      :src="preview"
                      alt="Preview Item"
                      loading="lazy"
                      style="max-width: 100%"
                    />
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        id="itemName"
                        placeholder="Nama item"
                        v-model="item.name"
                        readonly
                      />
                      <label for="itemName">Nama Item</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        id="itemQty"
                        placeholder="Qty item"
                        v-model="item.qty"
                        readonly
                      />
                      <label for="itemQty">Qty</label>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="input-group mb-3">
                      <span class="input-group-text"> Rp </span>
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          id="itemPrice"
                          placeholder="Harga item"
                          v-model="item.price"
                          readonly
                        />
                        <label for="itemPrice">Harga Jual</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating">
                      <textarea
                        class="form-control"
                        placeholder="Sebuah deskripsi singkat"
                        id="floatingTextarea"
                        rows="15"
                        style="height: 100%"
                        v-model="item.description"
                      ></textarea>
                      <label for="floatingTextarea">Deskripsi</label>
                    </div>
                  </div>
                </div>

                <div class="row justify-content-end">
                  <div class="col-md-5">
                    <button type="button" class="btn btn-outline-warning w-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                        />
                      </svg>
                      Ubah
                    </button>
                  </div>
                  <div class="col-md-5">
                    <button type="button" class="btn btn-outline-danger w-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                        />
                        <path
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                        />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
  formatDate,
} from "@/peripherals/Utils";
import PageHeader from "../../components/PageHeader.vue";
import { AUTHORIZATION, MERCHANT_ITEMS } from "../../peripherals/Constans";
export default {
  name: "ItemDetail",
  components: { Navbar, PageHeader, Footer },
  data() {
    return {
      preview: "../../assets/logo.png",
      item: {},
      breadcrumb: [
        {
          name: "Items",
          link: "items",
          active: false,
        },
        {
          name: "Detail",
          link: null,
          active: true,
        },
      ],
    };
  },
  methods: {
    fetchMerchant() {
      const data = {
        headers: {
          Authorization: AUTHORIZATION,
        },
        method: "GET",
      };
      fetchData(
        MERCHANT_ITEMS + "/" + this.$route.params.id,
        data,
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.item = result.data;
            this.item.CreatedAt = formatDate(result.data.CreatedAt);
            this.item.UpdatedAt = formatDate(result.data.UpdatedAt);
            this.preview = result.data.images[0].title;
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
  },
  mounted() {
    this.fetchMerchant();
  },
};
</script>

<style></style>
