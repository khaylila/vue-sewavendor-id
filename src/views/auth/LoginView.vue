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
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="email" class="form-label small"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="email"
                    v-model="email"
                    required
                  />
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label small"
                    >Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    id="password"
                    v-model="password"
                    required
                  />
                  <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password }}
                  </div>
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
                <button
                  v-if="!isSubmit"
                  type="submit"
                  class="btn btn-purple w-100"
                >
                  Login
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-purple w-100"
                  disabled
                >
                  <div class="spinner-border text-white" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
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
import Cookies from "js-cookie";
import { fetchData, showAlert } from "../../peripherals/Utils.js";
import { LOGIN } from "../../peripherals/Constans.js";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      isSubmit: false,
      errors: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmit = !this.isSubmit;
      this.errors = {
        email: null,
        password: null,
      };

      const data = {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: this.email,
          password: this.password,
          remember: this.remember,
        },
        method: "POST",
      };

      fetchData(
        LOGIN,
        data,
        (result) => {
          if (result.code == "400") {
            this.errors = result.errors;
          } else if (result.code == "401" || result.code == "500") {
            showAlert({
              title: "Error!",
              text: result.error.message,
            });
          } else {
            sessionStorage.setItem("role", result.data.role);
            sessionStorage.setItem(
              "user.firstname",
              result.data.user.firstname
            );
            sessionStorage.setItem("user.lastname", result.data.user.lastname);
            sessionStorage.setItem("user.avatar", result.data.user.avatar);
            if (!this.remember) {
              Cookies.set("Authorization", result.data.token);
            } else {
              Cookies.set("Authorization", result.data.token, {
                expires: 30,
              });
            }
            this.$router.push("/").then(() => this.$router.go(0));
          }
        },
        (error) => {
          showAlert();
        },
        () => {
          this.isSubmit = false;
        }
      );
    },
  },
};
</script>

<style></style>
