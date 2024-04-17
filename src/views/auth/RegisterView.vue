<template>
  <section id="main">
    <div class="container">
      <div class="row justify-content-center pt-3">
        <div class="col-md-8 col-lg-7">
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
              <h5 class="card-title">Register</h5>
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="firstname" class="form-label small"
                        >Nama Depan</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.firstname }"
                        id="firstname"
                        placeholder="Indah"
                        v-model="firstname"
                        required
                      />
                      <div v-if="errors.firstname" class="invalid-feedback">
                        {{ errors.firstname }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="lastname" class="form-label small"
                        >Nama Belakang</label
                      >
                      <input
                        type="twxt"
                        class="form-control"
                        :class="{ 'is-invalid': errors.lastname }"
                        id="lastname"
                        placeholder="Permata"
                        v-model="lastname"
                        required
                      />
                      <div v-if="errors.lastname" class="invalid-feedback">
                        {{ errors.lastname }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="email" class="form-label small"
                        >Email address</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors.email }"
                        id="email"
                        placeholder="mail@example.com"
                        v-model="email"
                        required
                      />
                      <div v-if="errors.email" class="invalid-feedback">
                        {{ errors.email }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="phonenumber" class="form-label small"
                        >Nomor Telepon</label
                      >
                      <div class="input-group has-validation mb-3">
                        <span class="input-group-text">+62</span>
                        <input
                          type="number"
                          class="form-control"
                          :class="{ 'is-invalid': errors.phonenumber }"
                          id="phonenumber"
                          placeholder="86738847583"
                          v-model="phonenumber"
                          required
                        />
                        <div v-if="errors.phonenumber" class="invalid-feedback">
                          {{ errors.phonenumber }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="password" class="form-label small"
                        >Password</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.password }"
                        id="password"
                        placeholder="Masukkan password"
                        v-model="password"
                        required
                      />
                      <div v-if="errors.password" class="invalid-feedback">
                        {{ errors.password }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="confirmPassword" class="form-label small"
                        >Repeat Password</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.confirmpassword }"
                        id="confirmpassword"
                        placeholder="Masukkan ulang password"
                        v-model="confirmpassword"
                        required
                      />
                      <div
                        v-if="errors.confirmpassword"
                        class="invalid-feedback"
                      >
                        {{ errors.confirmpassword }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :class="{ 'is-invalid': errors.agree }"
                    id="agree"
                    v-model="agree"
                    required
                  />
                  <label class="form-check-label small" for="agree"
                    >Saya setuju dengan
                    <router-link :to="{ name: 'term' }"
                      >syarat dan ketentuan</router-link
                    ></label
                  >
                  <div v-if="errors.agree" class="invalid-feedback">
                    {{ errors.agree }}
                  </div>
                </div>
                <button
                  v-if="!isSubmit"
                  type="submit"
                  class="btn btn-purple w-100"
                >
                  Register
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
            Sudah punya akun?
            <router-link :to="{ name: 'login' }">Masuk</router-link>
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
import {
  fetchData,
  showAlert,
  showAlertWithConfirm,
} from "../../peripherals/Utils.js";
import { REGISTER } from "../../peripherals/Constans.js";

export default {
  name: "RegisterView",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmpassword: "",
      agree: false,
      isSubmit: false,
      errors: {
        firstname: null,
        lastname: null,
        email: null,
        phonenumber: null,
        password: null,
        confirmpassword: null,
        agree: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmit = true;
      this.errors = {
        firstname: null,
        lastname: null,
        email: null,
        phonenumber: null,
        password: null,
        confirmpassword: null,
      };

      const data = {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phonenumber: this.phonenumber,
          password: this.password,
          repeatpassword: this.confirmpassword,
          agree: this.agree,
        },
        method: "POST",
      };

      fetchData(
        REGISTER,
        data,
        (result) => {
          console.log(result);
          if (result.code == "400") {
            this.errors = result.errors;
          } else if (result.code == "401" || result.code == "500") {
            this.showAlert({
              text: result.error.message,
            });
          } else {
            this.firstname = "";
            this.lastname = "";
            this.email = "";
            this.phonenumber = "";
            this.password = "";
            this.confirmpassword = "";
            this.agree = false;

            showAlertWithConfirm(
              {
                title: "Success!",
                text: result.data.message,
                icon: "success",
                allowOutsideClick: false,
              },
              (rst) => {
                if (rst.isConfirmed) {
                  this.$router.push("/");
                }
              }
            );
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
