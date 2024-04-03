<template>
  <section id="main">
    <div class="container">
      <div class="row justify-content-center pt-3">
        <div class="col-md-8 col-lg-4">
          <div class="text-center mb-3">
            <img
              src="../../assets/logo.png"
              alt="Logo Aplikasi"
              class="img-thumbnail rounded-circle"
              style="width: 175px; aspect-ratio: 1/1"
            />
          </div>
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Login</h5>
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label small"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label small"
                    >Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                  />
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                    v-model="remember"
                  />
                  <label class="form-check-label small" for="rememberMe"
                    >Remember Me</label
                  >
                </div>
                <button type="submit" class="btn btn-purple w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
          <p class="text-center small mt-3">
            Belum punya akun?
            <router-link :to="{ name: 'register' }"
              >Daftar sekarang</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
  <footer class="text-center mt-3">
    <small class="text-secondary">&copy; 2024 &dash; Sewavendor.id</small>
  </footer>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.email);
      console.log(this.password);
      console.log(this.remember);
    },
  },
};
</script>

<style></style>
