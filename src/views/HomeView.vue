<template>
  <Navbar active="home" />
  <div class="container">
    <section id="main" style="min-height: 100vh" class="py-4">
      <!-- header -->
      <PageHeader title="Dashboard" :breadcrumb="breadcrumb" />
      <!-- body -->
      <div class="shadow-sm">
        <div class="card rounded-0 border-0 color-gray-800">
          <div class="card-header bg-white">
            <h5>Example Card</h5>
          </div>
          <div class="card-body color-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </section>
    <footer class="text-center my-3">
      <hr />
      <small class="text-secondary">&copy; 2024 &dash; Sewavendor.id</small>
    </footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PageHeader from "../components/PageHeader.vue";

export default {
  components: { Navbar, PageHeader },
  name: "HomeView",
  data() {
    return {
      breadcrumb: [
        {
          name: "Home",
          link: "home",
          active: false,
        },
        {
          name: "Dashboard",
          link: null,
          active: true,
        },
      ],
    };
  },
  methods: {},
};
</script>
