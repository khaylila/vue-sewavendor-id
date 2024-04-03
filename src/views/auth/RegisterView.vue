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
              <form>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="firstName" class="form-label small"
                        >Nama Depan</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="indah"
                        v-model="firstName"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="lastName" class="form-label small"
                        >Nama Belakang</label
                      >
                      <input
                        type="twxt"
                        class="form-control"
                        id="lastName"
                        placeholder="permata"
                        v-model="lastName"
                      />
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
                        id="email"
                        placeholder="mail@example.com"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3">
                      <label for="phoneNumber" class="form-label small"
                        >Nomor Telepon</label
                      >
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"
                          >+62</span
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="phoneNumber"
                          placeholder="86738847583"
                          v-model="phoneNumber"
                        />
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
                        id="password"
                        placeholder="Masukkan password"
                        v-model="password"
                      />
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
                        id="confirmPassword"
                        placeholder="Masukkan ulang password"
                        v-model="confirmPassword"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="agree"
                    v-model="agree"
                  />
                  <label class="form-check-label small" for="agree"
                    >Saya setuju dengan
                    <a href="./terms-codition">syarat dan ketentuan</a></label
                  >
                </div>
                <button type="submit" class="btn btn-purple w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
          <p class="text-center small mt-3">
            Sudah punya akun? <a href="./login">Masuk!</a>
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
  name: "RegisterView",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agree: false,
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
