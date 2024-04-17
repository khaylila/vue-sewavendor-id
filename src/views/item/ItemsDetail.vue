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
                      class="img-thumbnail"
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
                        v-model="itemValue.name"
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
                        v-model="itemValue.qty"
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
                          v-model="itemValue.price"
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
                        style="height: 100%; resize: none"
                        v-model="itemValue.description"
                      ></textarea>
                      <label for="floatingTextarea">Deskripsi</label>
                    </div>
                  </div>
                </div>
                <!-- button -->
                <div class="row justify-content-between">
                  <div class="col-md-5" :class="{ 'd-none': deleteItemSubmit }">
                    <button
                      type="button"
                      class="btn btn-outline-warning w-100"
                      @click="handleEditItem"
                    >
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
                  <div
                    :class="{
                      'col-md-5': !deleteItemSubmit,
                      'col-12': deleteItemSubmit,
                    }"
                  >
                    <button
                      v-if="!deleteItemSubmit"
                      type="button"
                      class="btn btn-outline-danger w-100"
                      @click="handleDeleteItem"
                    >
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
                    <button
                      v-else
                      type="button"
                      class="btn btn-outline-danger w-100"
                      disabled
                    >
                      <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
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

  <template v-if="editItemModal">
    <ModalBS
      title="Ubah Merchant Item"
      @close="updateModalItemClose"
      ref="modalUpdateItemRef"
      :useBtnClose="true"
      :isForm="true"
    >
      <template v-slot:body>
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="nameItem" class="form-label">Nama Item</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': itemErrors.name }"
                placeholder="Nama Item"
                id="nameItem"
                v-model="itemValue.name"
              />
              <div v-if="itemErrors.name" class="invalid-feedback">
                {{ itemErrors.name }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="description" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': itemErrors.description }"
                id="description"
                rows="3"
                style="resize: none"
                v-model="itemValue.description"
              ></textarea>
              <div v-if="itemErrors.description" class="invalid-feedback">
                {{ itemErrors.description }}
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mb-3">
              <label for="itemQty" class="form-label">Qty</label>
              <input
                type="number"
                class="form-control"
                :class="{ 'is-invalid': itemErrors.qty }"
                id="itemQty"
                placeholder="Qty"
                v-model="itemValue.qty"
              />
              <div v-if="itemErrors.qty" class="invalid-feedback">
                {{ itemErrors.qty }}
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="mb-3">
              <label for="inputPrice" class="form-label">Harga Jual</label>
              <div class="input-group mb-3">
                <span class="input-group-text">Rp</span>
                <input
                  id="inputPrice"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': itemErrors.price }"
                  v-model="itemValue.price"
                />
                <div v-if="itemErrors.price" class="invalid-feedback">
                  {{ itemErrors.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="formFile" class="form-label">Preview Item</label>
              <input
                class="form-control"
                :class="{ 'is-invalid': itemErrors.images }"
                type="file"
                id="formFile"
                @change="handlePreviewItemUpload($event)"
                multiple
              />
              <div v-if="itemErrors.images" class="invalid-feedback">
                {{ itemErrors.images }}
              </div>
              <div v-else>
                <div class="form-text">
                  Mengupload gambar akan menimpa seluruh gambar yang ada.
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row justify-content-center">
              <template v-if="previews.length > 0">
                <template v-for="(image, index) in previews" :key="index">
                  <div class="col-sm-6 col-md-4 mb-3">
                    <img
                      :src="image"
                      class="img-thumbnail"
                      alt="Item Preview"
                    />
                  </div>
                </template>
              </template>
              <template v-else>
                <template
                  v-for="(image, index) in itemValue.images"
                  :key="index"
                >
                  <div class="col-sm-6 col-md-4 mb-3">
                    <img
                      :src="image.title"
                      class="img-thumbnail"
                      alt="Item Preview"
                    />
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          v-if="!editItemSubmit"
          type="submit"
          class="btn btn-purple"
          @click="handleEditItemSubmit"
        >
          Update
        </button>
        <button v-else type="button" class="btn btn-purple" disabled>
          <div class="spinner-border text-white" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </template>
    </ModalBS>
  </template>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import ModalBS from "../../components/Modal.vue";
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
  components: { Navbar, PageHeader, Footer, ModalBS },
  data() {
    return {
      preview: "../../assets/logo.png",
      previews: [],
      itemValue: {},
      itemErrors: {},
      editItemSubmit: false,
      editItemModal: false,
      deleteItemSubmit: false,
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
    updateModalItemClose() {
      this.editItemModal = false;
      this.fetchMerchant();
    },
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
            this.itemValue = result.data;
            this.itemValue.CreatedAt = formatDate(result.data.CreatedAt);
            this.itemValue.UpdatedAt = formatDate(result.data.UpdatedAt);
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
    handleEditItem() {
      this.editItemModal = !this.editItemModal;
    },
    handleDeleteItem() {
      showAlertWithConfirm(
        {
          title: "Hapus Item " + this.itemValue.name + "?",
          text: null,
          icon: "warning",
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: "Ya, hapus",
        },
        (rst) => {
          if (rst.isConfirmed) {
            this.deleteItemSubmit = true;
            fetchData(
              MERCHANT_ITEMS + "/" + this.$route.params.id,
              {
                headers: {
                  Authorization: AUTHORIZATION,
                },
                method: "DELETE",
              },
              (result) => {
                console.log(result);
                if (result.code != 200) {
                  showAlert({
                    text: result.error.message,
                  });
                } else {
                  showAlertWithConfirm(
                    {
                      title: "Success!",
                      text: result.data.message,
                      icon: "success",
                      allowOutsideClick: false,
                    },
                    (rst) => {
                      if (rst.isConfirmed) {
                        this.$router.push({
                          name: "items",
                        });
                      }
                    }
                  );
                }
              },
              (errors) => {
                showAlert({
                  text: errors,
                });
              },
              () => {
                this.deleteItemSubmit = true;
              }
            );
          }
        }
      );
    },
    handlePreviewItemUpload(e) {
      let count = e.target.files.length;
      let index = 0;
      if (e.target.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previews.push(e.target.result);
          };
          this.itemValue.images.push(e.target.files[index]);
          reader.readAsDataURL(e.target.files[index]);
          index++;
        }
      } else {
        this.previews = [];
        this.itemValue.images = [];
      }
    },
    handleEditItemSubmit() {
      this.editItemSubmit = true;

      const formData = new FormData();
      formData.append("id", this.$route.params.id);
      formData.append("name", this.itemValue.name);
      formData.append("description", this.itemValue.description);
      formData.append("qty", this.itemValue.qty);
      formData.append("price", this.itemValue.price);
      for (let index = 0; index < this.itemValue.images.length; index++) {
        formData.append("images", this.itemValue.images[index]);
      }

      fetchData(
        MERCHANT_ITEMS,
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
          body: formData,
          method: "PUT",
          type: "formData",
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.$refs.modalUpdateItemRef.hideModal();
            this.editItemModal = false;
            this.fetchMerchant();
            showAlertWithConfirm({
              title: "Success!",
              text: result.data.message,
              icon: "success",
            });
          }
        },
        (errors) => {
          showAlert({
            text: errors,
          });
        },
        () => {
          this.editItemSubmit = false;
        }
      );
    },
  },
  mounted() {
    this.fetchMerchant();
  },
};
</script>

<style></style>
