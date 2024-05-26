<template>
  <Navbar active="project-merchant" />
  <div class="container">
    <section id="main" style="min-height: 100vh" class="py-4">
      <!-- header -->
      <PageHeader
        :title="`Project Detail ${project.invoice}`"
        :breadcrumb="breadcrumb"
      />
      <!-- body -->
      <div class="shadow-sm">
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-body color-secondary">
            <template v-if="!isLoading">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <div class="card" style="width: 18rem">
                    <img
                      src="./../../assets/logo.png"
                      class="card-img-top"
                      alt="IMG detail project"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{{ project.itemName }}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">
                        {{ project.status }}
                      </h6>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="rentDate"
                          :value="project.price"
                          readonly
                        />
                        <label for="rentDate">Biaya Sewa</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="rentDate"
                          :value="`${createDMY(
                            project.start_date
                          )} s/d ${createDMY(project.end_date)}`"
                          readonly
                        />
                        <label for="rentDate">Tanggal Sewa</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="merchantName"
                          :value="project.merchant?.name"
                          readonly
                        />
                        <label for="merchantName">Merchant Name</label>
                      </div>

                      <template v-if="user.role == 'seller'">
                        <template
                          v-if="project.status == 'Menunggu konfirmasi vendor'"
                        >
                          <button
                            @click="handleMerchantConfirm"
                            class="btn btn-outline-info w-100 mb-3"
                          >
                            Terima Project
                          </button>
                        </template>
                        <template v-else>
                          <template
                            v-if="project.status != 'Pesanan Dibatalkan'"
                          >
                            <template v-if="project.status != 'Confirm Done'">
                              <button
                                v-if="!confirmDone"
                                @click="handleProjectDone"
                                class="btn btn-outline-info w-100 mb-3"
                              >
                                Tandai sudah selesai
                              </button>
                              <button
                                v-else
                                class="btn btn-outline-info w-100 mb-3"
                                disabled
                              >
                                Tandai sudah selesai
                              </button>
                            </template>
                          </template>
                        </template>
                      </template>
                      <button
                        class="btn btn-outline-secondary w-100"
                        @click="handleBack"
                      >
                        Kembali
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card mb-3">
                    <div
                      class="card-body overflow-y-auto"
                      style="position: relative; height: 400px"
                    >
                      <h5 class="card-title mb-3">Timeline</h5>
                      <hr />

                      <template v-for="tl in timeline.timeline" :key="tl.id">
                        <template v-if="tl.message_from == 1">
                          <div class="d-flex justify-content-between">
                            <p class="small mb-1">
                              {{ user.firstname + " " + user.lastname }}
                            </p>
                            <p class="small mb-1 text-muted">
                              {{ createDMY(tl.created_at) }}
                            </p>
                          </div>
                          <div
                            class="d-flex flex-row justify-content-start mb-3"
                          >
                            <img
                              :src="user.avatar"
                              alt="avatar 1"
                              style="width: 45px; height: 100%"
                            />
                            <div>
                              <p
                                class="small p-2 ms-3 mb-3 rounded-3"
                                style="background-color: #f5f6f7"
                              >
                                {{ tl.message }}
                              </p>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div class="d-flex justify-content-between">
                            <p class="small mb-1 text-muted">
                              {{ createDMY(tl.created_at) }}
                            </p>
                            <p v-if="tl.message_from == 2" class="small mb-1">
                              {{ timeline.merchant.name }}
                            </p>
                            <p
                              v-else-if="tl.message_from == 3"
                              class="small mb-1"
                            >
                              Administrator
                            </p>
                            <p v-else class="small mb-1">Sistem</p>
                          </div>
                          <div
                            class="d-flex flex-row align-self-start justify-content-end mb-3 pt-1"
                          >
                            <div>
                              <p
                                class="small p-2 me-3 mb-1 text-white rounded-3"
                                style="background-color: rgb(168 85 247)"
                              >
                                {{ tl.message }}
                              </p>
                            </div>
                            <img
                              v-if="tl.message_from == 2"
                              :src="timeline.merchant.avatar"
                              style="
                                border-radius: 15px;
                                width: 35px;
                                height: 100%;
                              "
                              alt="avatar 2"
                            />
                            <img
                              v-else
                              :src="timeline.system.avatar"
                              style="
                                border-radius: 15px;
                                width: 35px;
                                height: 100%;
                              "
                              alt="avatar system"
                            />
                          </div>
                        </template>
                      </template>

                      <!-- <div class="d-flex justify-content-between">
                        <p class="small mb-1">Timona Siera</p>
                        <p class="small mb-1 text-muted">23 Jan 5:37 pm</p>
                      </div>
                      <div
                        class="d-flex align-self-start flex-row justify-content-start mb-3"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%"
                        />
                        <div>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style="background-color: #f5f6f7"
                          >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit similique quae consequatur
                          </p>
                          <div
                            class="text-start ms-3"
                            style="border-radius: 15px"
                          >
                            <div class="bg-image">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                                style="border-radius: 15px"
                                alt="video"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex justify-content-between">
                        <p class="small mb-1 text-muted">23 Jan 6:10 pm</p>
                        <p class="small mb-1">Johny Bullock</p>
                      </div>
                      <div
                        class="d-flex flex-row justify-content-end mb-3 pt-1"
                      >
                        <div class="d-flex flex-column mb-2">
                          <p
                            class="small p-2 me-3 mb-3 text-white rounded-3"
                            style="background-color: rgb(168 85 247)"
                          >
                            Dolorum quasi voluptates quas amet in repellendus
                            perspiciatis fugiat
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style="width: 45px; height: 100%"
                        />
                      </div> -->
                    </div>
                  </div>
                  <template
                    v-if="project.status != 'Menunggu konfirmasi vendor'"
                  >
                    <template v-if="project.status != 'Pesanan Dibatalkan'">
                      <template v-if="project.status != 'Confirm Done'">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Tambahkan Komentar</h5>
                            <form @submit.prevent="handleSubmitTimeline">
                              <div class="form-floating mb-3">
                                <textarea
                                  class="form-control"
                                  placeholder="Leave a comment here"
                                  id="comment"
                                  style="height: 100px; resize: none"
                                  v-model="newTimeline.comment"
                                ></textarea>
                                <label for="comment">Komentar</label>
                              </div>

                              <div class="mb-3">
                                <label for="formFile" class="form-label"
                                  >Upload File</label
                                >
                                <input
                                  class="form-control"
                                  type="file"
                                  id="formFile"
                                  @change="handlePreviewItemUpload($event)"
                                  multiple
                                />
                              </div>

                              <button
                                v-if="!addTimelineSubmit"
                                type="submit"
                                class="btn btn-purple"
                              >
                                Kirim
                              </button>
                              <button
                                v-else
                                type="submit"
                                class="btn btn-purple"
                                disabled
                              >
                                Kirim
                              </button>
                            </form>
                          </div>
                        </div>
                      </template>
                    </template>
                  </template>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="loading-spinner">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
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
import PageHeader from "../../components/PageHeader.vue";
import { AUTHORIZATION, MERCHANT_PROJECTS } from "../../peripherals/Constans";
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
} from "@/peripherals/Utils";

export default {
  name: "ProjectDetail",
  components: { Navbar, Footer, PageHeader },
  data() {
    return {
      addTimelineSubmit: false,
      confirmDone: false,
      newTimeline: {
        comment: "",
        images: [],
      },
      breadcrumb: [
        {
          name: "Project",
          link: "project",
          active: false,
        },
        {
          name: "Detail",
          link: null,
          active: true,
        },
      ],
      isLoading: true,
      project: {
        // projectID: "INV-20240521-0001",
        // itemName: "Dekorasi Pernikahan",
        // price: "500000",
        // rentStart: "2024-10-12",
        // rentEnd: "2024-10-15",
        // status: "Menunggu Pembayaran",
        // merchant: { name: "Trend Decoration" },
      },
      timeline: {},
      user: {},
    };
  },
  methods: {
    handleProjectDone() {
      fetchData(
        `${MERCHANT_PROJECTS}/done/${this.project.id}`,
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
          method: "POST",
        },
        (result) => {
          console.log(result);
          if (result.code != "200") {
            this.showAlert({
              text: result.error.message,
            });
          } else {
            this.fetchItems();
            this.fetchTimeline();
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
          this.confirmDone = false;
        }
      );
    },
    handleMerchantConfirm() {
      fetchData(
        `${MERCHANT_PROJECTS}/confirm/${this.project.id}`,
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
          method: "POST",
        },
        (result) => {
          if (result.code !== "200") {
            console.log(result.code);
            this.showAlert({
              text: result.error.message,
            });
          } else {
            this.fetchItems();
            this.fetchTimeline();
            showAlertWithConfirm({
              title: "Success!",
              text: result.data.message,
              icon: "success",
            });
          }
        },
        (error) => {
          console.log(error);
          showAlert();
        },
        () => {
          this.addTimelineSubmit = false;
        }
      );
    },
    handleSubmitTimeline() {
      this.addTimelineSubmit = true;

      const formData = new FormData();
      formData.append("message", this.newTimeline.comment);
      for (let index = 0; index < this.newTimeline.images.length; index++) {
        formData.append("images", this.newTimeline.images[index]);
      }

      fetchData(
        `${MERCHANT_PROJECTS}/timeline/${this.project.id}`,
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
          if (result.code !== "201") {
            console.log(result.code);
            this.showAlert({
              text: result.error.message,
            });
          } else {
            this.fetchTimeline();
            this.newTimeline = {
              comment: "",
              images: [],
            };
            showAlertWithConfirm({
              title: "Success!",
              text: result.data.message,
              icon: "success",
            });
          }
        },
        (error) => {
          console.log(error);
          showAlert();
        },
        () => {
          this.addTimelineSubmit = false;
        }
      );
    },
    handlePreviewItemUpload(e) {
      let count = e.target.files.length;
      let index = 0;
      if (e.target.files) {
        while (count--) {
          // const reader = new FileReader();
          // reader.onload = (e) => {
          //   this.previews.push(e.target.result);
          // };
          this.newTimeline.images.push(e.target.files[index]);
          // reader.readAsDataURL(e.target.files[index]);
          index++;
        }
      } else {
        // this.previews = [];
        this.newTimeline.images = [];
      }
    },
    createDMY(requestDate) {
      const date = new Date(requestDate);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
      const day = String(date.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    handleBack() {
      this.$router.push({
        name: "merchant-project",
      });
    },
    fetchItems() {
      this.isLoading = true;
      fetchData(
        `${MERCHANT_PROJECTS}/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: AUTHORIZATION,
          },
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.project = result.data;
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
    fetchTimeline() {
      this.isLoading = true;
      fetchData(
        `${MERCHANT_PROJECTS}/timeline/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: AUTHORIZATION,
          },
        },
        (result) => {
          console.log(result);
          if (result.code != 200) {
            showAlert({
              text: result.error.message,
            });
          } else {
            this.timeline = result.data;
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
    setUser() {
      this.user = {
        firstname: sessionStorage.getItem("user.firstname"),
        lastname: sessionStorage.getItem("user.lastname"),
        avatar: sessionStorage.getItem("user.avatar"),
        role: sessionStorage.getItem("role"),
      };
    },
  },
  mounted() {
    this.fetchItems();
    this.fetchTimeline();
    this.setUser();
  },
};
</script>

<style></style>
