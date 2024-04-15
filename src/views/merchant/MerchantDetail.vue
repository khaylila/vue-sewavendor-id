<template>
  <template v-if="status == 'detail'">
    <ModalBS
      title="Detail Merchant"
      @close="detailToggle"
      ref="modalDetailMerchantRef"
      :useBtnClose="false"
    >
      <template v-slot:body>
        <div class="mb-3">
          <label for="name" class="form-label">Nama Merchant</label>
          <input
            type="text"
            class="form-control"
            id="name"
            :value="merchant.name"
            readonly
          />
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Nomor Telpon</label>
              <div class="input-group mb-3">
                <span class="input-group-text">62</span>
                <input
                  id="phoneNumber"
                  type="text"
                  class="form-control"
                  :value="merchant.phone_number"
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="pemilik" class="form-label">Pemilik</label>
              <input
                type="text"
                class="form-control"
                id="pemilik"
                :value="
                  merchant.user?.first_name + ' ' + merchant.user?.last_name
                "
                readonly
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="address" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                id="address"
                rows="3"
                style="resize: none"
                v-model="merchant.address"
                readonly
              ></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="mb-2">Logo</label>
              <img
                :src="merchant.avatar"
                class="img-thumbnail"
                alt="Merchant Logo"
              />
            </div>
          </div>
          <div class="col-md-6 align-self-center">
            <p class="small mb-2">
              Waktu Ditambahkan:<br />
              {{ merchant.CreatedAt }}
            </p>
            <p class="small">
              Terakhir kali diubah:<br />
              {{ merchant.UpdatedAt }}
            </p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          class="btn btn-outline-warning"
          type="button"
          @click="handlerEditMerchant"
        >
          Ubah Data
        </button>
        <button
          v-if="!isLoading"
          class="btn btn-outline-danger"
          type="button"
          @click="handlerResetMerchant"
        >
          Reset Password
        </button>
        <button v-else type="submit" class="btn btn-outline-danger" disabled>
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </template>
    </ModalBS>
  </template>
  <template v-else>
    <ModalBS
      title="Ubah Merchant"
      @close="detailToggle"
      ref="modalDetailMerchantRef"
      :useBtnClose="true"
      :isForm="true"
    >
      <template v-slot:body>
        <div class="mb-3">
          <label for="name" class="form-label">Nama Merchant</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="merchant.name"
          />
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Nomor Telpon</label>
              <div class="input-group mb-3">
                <span class="input-group-text">62</span>
                <input
                  id="phoneNumber"
                  type="text"
                  class="form-control"
                  v-model="merchant.phone_number"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="pemilik" class="form-label">Pemilik</label>
              <input
                type="text"
                class="form-control"
                id="pemilik"
                v-model="merchantFullname"
                readonly
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="address" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                id="address"
                rows="3"
                style="resize: none"
                v-model="merchant.address"
              ></textarea>
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-3">
              <div class="row">
                <div class="col-8 align-self-center">
                  <div class="mb-3">
                    <label for="formFile" class="form-label">Logo</label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      @change="handleAvatarMerchantUpload($event)"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <img
                    v-if="preview"
                    :src="preview"
                    class="img-thumbnail"
                    alt="Merchant Logo"
                  />
                  <img
                    v-else
                    :src="merchant.avatar"
                    class="img-thumbnail"
                    alt="Merchant Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          v-if="!isLoading"
          class="btn btn-outline-success"
          type="submit"
          @click="handlerSaveMerchant"
        >
          Save
        </button>
        <button v-else type="submit" class="btn btn-outline-success" disabled>
          <div class="spinner-border text-white" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </template>
    </ModalBS>
  </template>
</template>

<script>
import ModalBS from "../../components/Modal.vue";
import {
  AUTHORIZATION,
  MERCHANT,
  MERCHANT_RESETPASS,
} from "../../peripherals/Constans";
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
  formatDate,
} from "@/peripherals/Utils";

export default {
  name: "MerchantDetail",
  components: { ModalBS },
  props: ["merchantId", "status"],
  data() {
    return {
      isLoading: false,
      merchant: {},
      merchantFullname: "",
      preview: null,
      merchantAvatarUpload: null,
      editMerchantErrors: {},
    };
  },
  methods: {
    detailToggle() {
      this.$emit("closeDetail");
    },
    handlerEditMerchant() {
      this.$refs.modalDetailMerchantRef.hideModal();
      this.$emit("editClicked");
    },
    handleAvatarMerchantUpload(e) {
      console.log(e);
      if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.preview = ev.target.result;
        };
        this.merchantAvatarUpload = e.target.files[0];
        reader.readAsDataURL(e.target.files[0]);
      } else {
        this.preview = null;
        this.merchantAvatarUpload = null;
      }
    },
    handlerSaveMerchant() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("id", this.merchant.ID);
      formData.append("firstName", this.merchant.user.first_name);
      formData.append("lastName", this.merchant.user.last_name);
      formData.append("merchantName", this.merchant.name);
      formData.append("phoneNumber", this.merchant.phone_number);
      formData.append("address", this.merchant.address);
      formData.append("avatar", this.merchantAvatarUpload);

      fetchData(
        MERCHANT,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: AUTHORIZATION,
          },
          type: "formData",
        },
        (result) => {
          console.log(result);
          if (result.code == "400") {
            this.editMerchantErrors = result.errors;
          } else if (result.code == "401" || result.code == "500") {
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
                  this.fetchMerchant();
                  this.$refs.modalDetailMerchantRef.hideModal();
                  this.$emit("editSuccess");
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
          this.isLoading = false;
        }
      );
    },
    fetchMerchant() {
      const data = {
        headers: {
          Authorization: AUTHORIZATION,
        },
        method: "GET",
      };
      fetchData(
        MERCHANT + "/" + this.merchantId,
        data,
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.merchant = result.data;
            this.merchant.CreatedAt = formatDate(result.data.CreatedAt);
            this.merchant.UpdatedAt = formatDate(result.data.UpdatedAt);
            this.merchantFullname =
              result.data.user.first_name + " " + result.data.user.last_name;
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
    handlerResetMerchant() {
      showAlertWithConfirm(
        {
          title: "Reset Password",
          text: "Yakin ingin mengganti password merchant?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Lanjutkan",
        },
        (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            const data = {
              headers: {
                Authorization: AUTHORIZATION,
              },
              method: "POST",
            };
            fetchData(
              MERCHANT_RESETPASS + "/" + this.merchantId,
              data,
              (result) => {
                console.log(result);
                if (result.code != 200) {
                  showAlert({
                    text: result.error.message,
                  });
                } else {
                  showAlert({
                    title: "Success",
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
                this.isLoading = false;
              }
            );
          }
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
