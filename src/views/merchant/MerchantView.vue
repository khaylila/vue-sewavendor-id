<template>
  <Navbar active="merchant" />
  <div class="container">
    <section id="main" style="min-height: 100vh" class="py-4">
      <!-- header -->
      <PageHeader title="Merchant" :breadcrumb="breadcrumb" />
      <!-- body -->
      <div
        class="shadow-sm"
        :class="{ 'cursor-progress': selectedMerchantId != null }"
      >
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-body color-secondary">
            <!-- add and search -->
            <div class="row justify-content-between">
              <div class="col-md-3 col-lg-2 mb-2">
                <button
                  class="btn btn-outline-success w-100"
                  type="button"
                  id="tambahMerchant"
                  @click="toggleModal"
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
                  <select
                    class="form-select"
                    id="filter"
                    style="max-width: 100px"
                    v-model="filter"
                  >
                    <option value="name" selected>Nama</option>
                    <option value="phone_number">Telpon</option>
                    <option value="address">Alamat</option>
                  </select>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Merchant"
                    v-model="search"
                    @keyup.enter="getMerchant"
                  />
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    id="searchMerchant"
                    @click.prevent="getMerchant"
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
                    <th scope="col">No</th>
                    <th scope="col">Merchant</th>
                    <th scope="col">Telpon</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Pemilik</th>
                    <th scope="col">Logo</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="isLoading">
                    <tr>
                      <td colspan="6" class="text-center">
                        <div class="spinner-border my-3" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-if="merchantPage.total == 0">
                      <td colspan="6" class="text-center">
                        Data tidak ditemukan!
                      </td>
                    </tr>
                    <tr
                      :class="{
                        'cursor-pointer': selectedMerchantId == null,
                      }"
                      v-for="(merchant, index) in merchants"
                      :key="merchant.ID"
                      @click="handleMerchantClick(merchant.ID)"
                    >
                      <td class="align-middle">
                        {{
                          (merchantPage.current - 1) * merchantPage.limit +
                          (index + 1)
                        }}
                      </td>
                      <td class="align-middle">{{ merchant.name }}</td>
                      <td class="align-middle">
                        62{{ merchant.phone_number }}
                      </td>
                      <td class="align-middle">{{ merchant.address }}</td>
                      <td class="align-middle">
                        {{
                          merchant.user.first_name +
                          " " +
                          merchant.user.last_name
                        }}
                      </td>
                      <td class="align-middle">
                        <img
                          :src="merchant.avatar"
                          style="width: 30px; aspect-ratio: 1/1"
                          alt="Merchant Avatar"
                        />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <!-- pagination -->
            <Pagination
              v-if="!isLoading && merchantPage.total != 0"
              :page="merchantPage"
              link="MERCHANT"
              @linkClicked="handlePagination"
            />
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
  <template v-if="addMerchantModal">
    <ModalBS
      title="Tambah Merchant"
      :isForm="true"
      :handleSubmit="handleAddMerchant"
      @close="toggleModal"
      @dispose="toggleModal"
      ref="modalAddMerchantRef"
      :useBtnClose="false"
    >
      <template v-slot:body>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="firstName" class="form-label">Nama Awal</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': newMerchantErrors.firstname }"
                id="firstName"
                placeholder="Nama Awal"
                v-model="newMerchant.firstName"
              />
              <div v-if="newMerchantErrors.firstname" class="invalid-feedback">
                {{ newMerchantErrors.firstname }}
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="lastName" class="form-label">Nama Akhir</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': newMerchantErrors.lastname }"
                id="lastName"
                placeholder="Nama Akhir"
                v-model="newMerchant.lastName"
              />
              <div v-if="newMerchantErrors.lastname" class="invalid-feedback">
                {{ newMerchantErrors.lastname }}
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{ 'is-invalid': newMerchantErrors.email }"
                id="email"
                placeholder="Email"
                v-model="newMerchant.email"
              />
              <div v-if="newMerchantErrors.email" class="invalid-feedback">
                {{ newMerchantErrors.email }}
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Nomor Telpon</label>
              <div class="input-group mb-3">
                <span class="input-group-text">62</span>
                <input
                  id="phoneNumber"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': newMerchantErrors.phonenumber }"
                  v-model="newMerchant.phoneNumber"
                />
                <div
                  v-if="newMerchantErrors.phonenumber"
                  class="invalid-feedback"
                >
                  {{ newMerchantErrors.phonenumber }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="merchantname" class="form-label">Nama Merchant</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': newMerchantErrors.merchantname }"
                id="merchantname"
                placeholder="Nama Merchant"
                v-model="newMerchant.merchantName"
              />
              <div
                v-if="newMerchantErrors.merchantname"
                class="invalid-feedback"
              >
                {{ newMerchantErrors.merchantname }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="address" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': newMerchantErrors.address }"
                id="address"
                rows="3"
                style="resize: none"
                v-model="newMerchant.address"
              ></textarea>
              <div v-if="newMerchantErrors.address" class="invalid-feedback">
                {{ newMerchantErrors.address }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          v-if="!addMerchantSubmit"
          type="submit"
          @click="handleAddMerchant"
          class="btn btn-purple"
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

  <template v-if="detailMerchantModal">
    <MerchantDetail
      :merchantId="selectedMerchantId"
      :modal="detailMerchantModal"
      @closeDetail="toggleDetailModal"
      :status="detailMerchantStatus"
      @editClicked="handleEditMerchant"
      @editSuccess="handleEditMerchantSucces"
    />
  </template>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import PageHeader from "../../components/PageHeader.vue";
import ModalBS from "../../components/Modal.vue";
import Pagination from "../../components/Pagination.vue";
import { AUTHORIZATION, MERCHANT } from "../../peripherals/Constans";
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
} from "@/peripherals/Utils";
import MerchantDetail from "./MerchantDetail.vue";

export default {
  name: "MerchantView",
  components: {
    Navbar,
    PageHeader,
    ModalBS,
    MerchantDetail,
    Pagination,
    Footer,
  },
  data() {
    return {
      search: "",
      filter: "name",
      addMerchantModal: false,
      addMerchantSubmit: false,
      detailMerchantModal: false,
      detailMerchantStatus: "detail",
      selectedMerchantId: null,
      isLoading: true,
      breadcrumb: [
        {
          name: "Merchant",
          link: "merchant",
          active: false,
        },
        {
          name: "List",
          link: null,
          active: true,
        },
      ],
      merchants: {},
      merchantPage: {},
      newMerchant: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        merchantName: "",
        address: "",
      },
      newMerchantErrors: {
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        merchantname: "",
        address: "",
      },
    };
  },
  methods: {
    toggleModal() {
      this.addMerchantModal = !this.addMerchantModal;
    },
    handleMerchantClick(merchantId) {
      if (this.selectedMerchantId == null) {
        this.selectedMerchantId = merchantId;
        this.detailMerchantModal = true;
      }
    },
    handleAddMerchant() {
      console.log("addMerchant clicked");
      console.log(this.newMerchant);

      this.addMerchantSubmit = true;
      this.errors = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        phoneNumber: "",
        merchantName: "",
        address: "",
      };

      const data = {
        headers: {
          Authorization: AUTHORIZATION,
        },
        body: {
          firstName: this.newMerchant.firstName,
          lastName: this.newMerchant.lastName,
          email: this.newMerchant.email,
          phoneNumber: this.newMerchant.phoneNumber,
          merchantName: this.newMerchant.merchantName,
          address: this.newMerchant.address,
        },
        method: "POST",
      };

      fetchData(
        MERCHANT,
        data,
        (result) => {
          console.log(result);
          if (result.code == "400") {
            this.newMerchantErrors = result.errors;
          } else if (result.code == "401" || result.code == "500") {
            this.showAlert({
              text: result.error.message,
            });
          } else {
            this.fetchMerchant();
            this.newMerchant = {
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              merchantName: "",
              address: "",
            };
            showAlertWithConfirm(
              {
                title: "Success!",
                text: result.data.message,
                icon: "success",
                allowOutsideClick: false,
              },
              (rst) => {
                if (rst.isConfirmed) {
                  this.$refs.modalAddMerchantRef.hideModal();
                }
              }
            );
          }
        },
        (error) => {
          showAlert();
        },
        () => {
          this.addMerchantSubmit = false;
        }
      );
    },
    toggleDetailModal() {
      this.selectedMerchantId = null;
      this.detailMerchantModal = false;
      this.detailMerchantStatus = "detail";
    },
    fetchMerchant(url) {
      this.isLoading = true;
      if (url == undefined) {
        url = MERCHANT + "?";
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
            filter: this.filter,
          },
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.merchants = result.data;
            this.merchantPage = result.page;
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
    getMerchant() {
      this.fetchMerchant();
    },
    handlePagination(url) {
      console.log("clicked");
      this.fetchMerchant(url);
    },
    toggleModalAddMerchant() {
      this.addMerchantModal = false;
      this.fetchMerchant();
    },
    handleEditMerchant() {
      this.detailMerchantStatus = "editMerchant";
    },
    handleEditMerchantSucces() {
      this.detailMerchantStatus = "detail";
      this.fetchMerchant();
    },
  },
  mounted() {
    this.fetchMerchant();
  },
  updated() {},
};
</script>

<style></style>
