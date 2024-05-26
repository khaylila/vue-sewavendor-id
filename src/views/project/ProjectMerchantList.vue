<template>
  <Navbar active="project-merchant" />
  <div class="container">
    <section id="main" style="min-height: 100vh" class="py-4">
      <!-- header -->
      <PageHeader title="Project List" :breadcrumb="breadcrumb" />
      <!-- body -->
      <div class="shadow-sm">
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-body color-secondary">
            <template v-if="!isLoading">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="text-center" scope="col">Project ID</th>
                    <th class="text-center" scope="col">Item Name</th>
                    <th class="text-center" scope="col">Price</th>
                    <th class="text-center" scope="col">Rent Start</th>
                    <th class="text-center" scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="isLoading">
                    <tr>
                      <td colspan="5" class="text-center">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr
                      v-for="project in projects"
                      :key="project.id"
                      @click="handleClickProject(project.id)"
                    >
                      <th class="text-center" scope="row">
                        {{ project.invoice }}
                      </th>
                      <td>{{ project.item_name }}</td>
                      <td class="text-center">{{ project.price }}</td>
                      <td class="text-center">{{ project.start_date }}</td>
                      <td class="text-center">{{ project.status }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
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
import { fetchData, showAlert } from "@/peripherals/Utils";

export default {
  name: "ProjectMerchantList",
  components: { Navbar, Footer, PageHeader },
  data() {
    return {
      breadcrumb: [
        {
          name: "Store",
          link: "store",
          active: false,
        },
        {
          name: "Project",
          link: null,
          active: true,
        },
      ],
      isLoading: true,
      projects: [
        // {
        //   projectID: "INV-20240521-0001",
        //   itemName: "Dekorasi Pernikahan",
        //   price: "500000",
        //   rentStart: "2024-10-12",
        //   status: "Menunggu Pembayaran",
        // },
        // {
        //   projectID: "INV-20240521-0002",
        //   itemName: "Sound System",
        //   price: "700000",
        //   rentStart: "2024-07-12",
        //   status: "Menunggu Konfirmasi",
        // },
        // {
        //   projectID: "INV-20240521-0003",
        //   itemName: "Catering",
        //   price: "400000",
        //   rentStart: "2024-09-12",
        //   status: "Menunggu Konfirmasi",
        // },
      ],
    };
  },
  methods: {
    handleClickProject(projectID) {
      this.$router.push({
        name: "merchant-project-detail",
        params: { id: projectID },
      });
    },
    fetchItems() {
      this.isLoading = true;
      console.log(MERCHANT_PROJECTS);
      fetchData(
        `${MERCHANT_PROJECTS}`,
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
            this.projects = result.data;
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
    this.fetchItems();
  },
};
</script>

<style></style>
