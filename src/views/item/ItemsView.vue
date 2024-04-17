<template>
  <Navbar active="items" />
  <div class="container">
    <section id="main" style="min-height: 100vh" class="py-4">
      <!-- header -->
      <PageHeader title="Merchant Items" :breadcrumb="breadcrumb" />
      <!-- body -->
      <div class="shadow-sm">
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-body color-secondary">
            <!-- add and search -->
            <div class="row justify-content-between">
              <div class="col-md-3 col-lg-2 mb-2">
                <button
                  class="btn btn-outline-success w-100"
                  type="button"
                  @click="toggleModalAddItem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-building-add"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"
                    />
                    <path
                      d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z"
                    />
                    <path
                      d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"
                    />
                  </svg>
                  Tambah
                </button>
              </div>
              <div class="col-md-7 col-lg-5">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Items"
                    v-model="search"
                    @keyup.enter="getItems"
                  />
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click.prevent="getItems"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <!-- tabel -->
            <div class="p-3">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" class="text-center">No</th>
                    <th scope="col" class="text-center">Nama</th>
                    <th scope="col" class="text-center">Preview</th>
                    <th scope="col" class="text-center">Qty</th>
                    <th scope="col" class="text-center">Harga</th>
                    <th scope="col" class="text-center">On Going</th>
                    <th scope="col" class="text-center">Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="isLoading">
                    <tr>
                      <td colspan="7" class="text-center">
                        <div class="spinner-border my-3" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-if="itemsPage.total == 0">
                      <td colspan="7" class="text-center">
                        Belum ada item yang ditambahkan.
                      </td>
                    </tr>
                    <tr
                      :class="{ 'cursor-pointer': cursor == 'pointer' }"
                      v-for="(item, index) in items"
                      :key="item.ID"
                      @click="handleItemClick(item.ID)"
                      @mouseenter="setCursorPointer"
                      @mouseleave="setCursorDefault"
                    >
                      <td class="align-middle text-center">
                        {{
                          (itemsPage.current - 1) * itemsPage.limit +
                          (index + 1)
                        }}
                      </td>
                      <td class="align-middle">{{ item.name }}</td>
                      <td class="align-middle text-center">
                        <template
                          v-for="image in item.images"
                          :key="image.title"
                        >
                          <img
                            :src="image.title"
                            loading="lazy"
                            class="img-fluid img-thumbnail"
                            alt="Item Preview"
                            style="width: 50px; height: 50px"
                            @click.self="handleImgPreview"
                          />
                        </template>
                      </td>
                      <td class="align-middle text-center">{{ item.qty }}</td>
                      <td class="align-middle text-center">{{ item.price }}</td>
                      <td class="align-middle text-center">
                        {{ item.on_going + " / " + item.qty }}
                      </td>
                      <td class="align-middle text-center">
                        {{ item.closed }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <!-- pagination -->
            <Pagination
              v-if="!isLoading && itemsPage.total != 0"
              :page="itemsPage"
              link="MERCHANT_ITEMS"
              @linkClicked="handlePagination"
            />
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>

  <template v-if="addItemModal">
    <ModalBS
      title="Tambah Merchant Item"
      :isForm="true"
      @close="toggleModal"
      @dispose="toggleModalAddItem"
      ref="modalAddItemRef"
      :useBtnClose="false"
    >
      <template v-slot:body>
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="nameItem" class="form-label">Nama Item</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': newItemErrors.name }"
                placeholder="Nama Item"
                id="nameItem"
                v-model="newItemValue.name"
              />
              <div v-if="newItemErrors.name" class="invalid-feedback">
                {{ newItemErrors.name }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="description" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': newItemErrors.description }"
                id="description"
                rows="3"
                style="resize: none"
                v-model="newItemValue.description"
              ></textarea>
              <div v-if="newItemErrors.description" class="invalid-feedback">
                {{ newItemErrors.description }}
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mb-3">
              <label for="itemQty" class="form-label">Qty</label>
              <input
                type="number"
                class="form-control"
                :class="{ 'is-invalid': newItemErrors.qty }"
                id="itemQty"
                placeholder="Qty"
                v-model="newItemValue.qty"
              />
              <div v-if="newItemErrors.qty" class="invalid-feedback">
                {{ newItemErrors.qty }}
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
                  :class="{ 'is-invalid': newItemErrors.price }"
                  v-model="newItemValue.price"
                />
                <div v-if="newItemErrors.price" class="invalid-feedback">
                  {{ newItemErrors.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="formFile" class="form-label">Preview Item</label>
              <input
                class="form-control"
                :class="{ 'is-invalid': newItemErrors.images }"
                type="file"
                id="formFile"
                @change="handlePreviewItemUpload($event)"
                multiple
              />
              <div v-if="newItemErrors.images" class="invalid-feedback">
                {{ newItemErrors.images }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row justify-content-center">
              <template v-for="(image, index) in previews" :key="index">
                <div class="col-sm-6 col-md-4 mb-3">
                  <img :src="image" class="img-thumbnail" alt="Item Preview" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          v-if="!addItemSubmit"
          type="submit"
          class="btn btn-purple"
          @click="handleAddItemSubmit"
        >
          Tambah
        </button>
        <button v-else type="submit" class="btn btn-purple" disabled>
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
import PageHeader from "../../components/PageHeader.vue";
import ModalBS from "../../components/Modal.vue";
import Pagination from "../../components/Pagination.vue";
import { AUTHORIZATION, MERCHANT_ITEMS } from "../../peripherals/Constans";
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
} from "@/peripherals/Utils";
export default {
  name: "ItemsView",
  components: { Navbar, PageHeader, Pagination, ModalBS, Footer },
  data() {
    return {
      cursor: "default",
      search: "",
      filter: "name",
      isLoading: true,
      breadcrumb: [
        {
          name: "Items",
          link: "items",
          active: false,
        },
        {
          name: "List",
          link: null,
          active: true,
        },
      ],
      items: {},
      itemsPage: {},
      search: "",
      addItemSubmit: false,
      addItemModal: false,
      newItemValue: {
        name: "",
        description: "",
        qty: 0,
        price: 0,
      },
      previews: [],
      images: [],
      newItemErrors: {
        name: "",
        description: "",
        qty: "",
        price: "",
        images: "",
      },
    };
  },
  methods: {
    setCursorPointer() {
      this.cursor = "pointer";
    },
    setCursorDefault() {
      this.cursor = "default";
    },
    toggleModalAddItem() {
      this.addItemModal = !this.addItemModal;
    },
    fetchItems(url) {
      this.isLoading = true;
      if (url == undefined) {
        url = MERCHANT_ITEMS + "?";
      }
      fetchData(
        url,
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
          method: "GET",
          body: {
            search: this.search,
          },
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.items = result.data;
            this.itemsPage = result.page;
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
    handlePagination(url) {
      this.fetchItems(url);
    },
    handleItemClick(id) {
      this.$router.push({ name: "itemsDetail", params: { id: id } });
    },
    getItems() {
      this.fetchItems();
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
          this.images.push(e.target.files[index]);
          reader.readAsDataURL(e.target.files[index]);
          index++;
        }
      } else {
        this.previews = [];
        this.images = [];
      }
    },
    toggleModal() {
      this.addItemModal = false;
    },
    handleAddItemSubmit() {
      console.log("submited");
      this.addItemSubmit = true;
      this.newItemErrors = {
        name: "",
        description: "",
        qty: "",
        price: "",
        images: "",
      };

      const formData = new FormData();
      formData.append("name", this.newItemValue.name);
      formData.append("description", this.newItemValue.description);
      formData.append("qty", this.newItemValue.qty);
      formData.append("price", this.newItemValue.price);
      for (let index = 0; index < this.images.length; index++) {
        formData.append("images", this.images[index]);
      }

      fetchData(
        MERCHANT_ITEMS,
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
          body: formData,
          method: "POST",
          type: "formData",
        },
        (result) => {
          console.log(result);
          if (result.code == "400") {
            this.newItemErrors = result.errors;
          } else if (result.code == "401" || result.code == "500") {
            this.showAlert({
              text: result.error.message,
            });
          } else {
            this.$refs.modalAddItemRef.hideModal();
            this.fetchItems();
            this.newItemValue = {
              name: "",
              description: "",
              qty: 0,
              price: 0,
            };
            this.previews = [];
            this.images = [];
            showAlertWithConfirm({
              title: "Success!",
              text: result.data.message,
              icon: "success",
            });
          }
        },
        (error) => {
          showAlert();
        },
        () => {
          this.addItemSubmit = false;
        }
      );
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style></style>
