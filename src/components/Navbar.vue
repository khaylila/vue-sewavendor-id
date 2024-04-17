<template>
  <nav
    v-if="active == 'store'"
    class="navbar navbar-dark navbar-expand-lg bg-purple"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'store' }">
        <img
          src="./../assets/logo.png"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Sewavendor.id</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <div class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style="width: 400px"
            v-model="searchItem"
            @keydown.enter="handleSubmitSearch"
          />
        </div>
        <template v-if="!isLogin">
          <div class="d-flex">
            <button class="btn btn-secondary me-2" @click="handleRegister">
              Register
            </button>
            <button class="btn btn-success" @click="handleLogin">Login</button>
          </div>
        </template>
        <template v-else>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li class="nav-item me-2">
              <a href="#" class="position-relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-bell"
                  viewBox="0 0 16 16"
                  style="display: inline-block; fill: #fff"
                >
                  <path
                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
                  /></svg
              ></a>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <a
                  class="dropdown-toggle text-white text-decoration-0"
                  :class="{ show: dropdownMenu }"
                  role="button"
                  data-bs-toggle="dropdown"
                  @click="handleDropdownMenu"
                >
                  <img
                    alt="image"
                    :src="user.avatar"
                    class="rounded-circle mr-1 profile-picture"
                    loading="lazy"
                  />
                  Hi, {{ user.firstname + " " + user.lastname }}
                </a>

                <ul
                  class="dropdown-menu"
                  :class="{ show: dropdownMenu }"
                  @mouseleave="dropdownMenuFalse"
                >
                  <li>
                    <div class="dropdown-title">{{ user.role }}</div>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item small has-icon"
                      :to="{ name: 'profile' }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-fill"
                        viewBox="0 0 16 16"
                        style="display: inline-block"
                      >
                        <path
                          d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                        />
                      </svg>
                      Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item small has-icon"
                      :to="{ name: 'change-password' }"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-key"
                        viewBox="0 0 16 16"
                        style="display: inline-block"
                      >
                        <path
                          d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"
                        />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                      Change Password
                    </router-link>
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-danger has-icon small"
                      href="./logout"
                      @click.prevent="handleLogout"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                        style="display: inline-block"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                        />
                      </svg>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </nav>
  <nav v-else class="navbar navbar-dark navbar-expand-lg bg-purple">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <img
          src="./../assets/logo.png"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Sewavendor.id</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              aria-current="page"
              class="nav-link"
              :class="{ active: active == 'home' }"
              :to="{ name: 'home' }"
              >Dashboard</router-link
            >
          </li>
          <template v-if="user.role == 'superadmin'">
            <li class="nav-item">
              <router-link
                aria-current="page"
                class="nav-link"
                :class="{ active: active == 'merchant' }"
                :to="{ name: 'merchant' }"
                >Merchant</router-link
              >
            </li>
          </template>
          <template v-if="user.role == 'seller'">
            <li class="nav-item">
              <router-link
                aria-current="page"
                class="nav-link"
                :class="{ active: active == 'items' }"
                :to="{ name: 'items' }"
                >Items</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                aria-current="page"
                class="nav-link"
                :class="{ active: active == 'report' }"
                :to="{ name: 'home' }"
                >Report</router-link
              >
            </li>
          </template>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item me-2">
            <a href="#" class="position-relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-bell"
                viewBox="0 0 16 16"
                style="display: inline-block; fill: #fff"
              >
                <path
                  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
                />
              </svg>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                3
                <span class="visually-hidden">unread messages</span>
              </span></a
            >
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <a
                class="dropdown-toggle text-white text-decoration-0"
                :class="{ show: dropdownMenu }"
                role="button"
                data-bs-toggle="dropdown"
                @click="handleDropdownMenu"
              >
                <img
                  alt="image"
                  :src="user.avatar"
                  class="rounded-circle mr-1 profile-picture"
                  loading="lazy"
                />
                Hi, {{ user.firstname + " " + user.lastname }}
              </a>

              <ul
                class="dropdown-menu"
                :class="{ show: dropdownMenu }"
                @mouseleave="dropdownMenuFalse"
              >
                <li>
                  <div class="dropdown-title">{{ user.role }}</div>
                </li>
                <li>
                  <router-link
                    class="dropdown-item small has-icon"
                    :to="{ name: 'profile' }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"
                      style="display: inline-block"
                    >
                      <path
                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                      />
                    </svg>
                    Profile
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item small has-icon"
                    :to="{ name: 'change-password' }"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-key"
                      viewBox="0 0 16 16"
                      style="display: inline-block"
                    >
                      <path
                        d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"
                      />
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                    Change Password
                  </router-link>
                </li>
                <li>
                  <a
                    class="dropdown-item text-danger has-icon small"
                    href="./logout"
                    @click.prevent="handleLogout"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                      style="display: inline-block"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
import { AUTHORIZATION } from "../peripherals/Constans";

export default {
  name: "Navbar",
  props: ["active"],
  data() {
    return {
      user: {
        firstname: sessionStorage.getItem("user.firstname"),
        lastname: sessionStorage.getItem("user.lastname"),
        avatar: sessionStorage.getItem("user.avatar"),
        role: sessionStorage.getItem("role"),
      },
      dropdownMenu: false,
      searchItem: "",
      isLogin: AUTHORIZATION !== null,
    };
  },
  methods: {
    handleLogin() {
      this.$router.push({ name: "login" });
    },
    handleRegister() {
      this.$router.push({ name: "register" });
    },
    handleSubmitSearch() {
      this.$emit("searchItem", this.searchItem);
    },
    dropdownMenuFalse() {
      this.dropdownMenu = false;
    },
    handleDropdownMenu() {
      this.dropdownMenu = !this.dropdownMenu;
    },
    handleLogout() {
      Swal.fire({
        title: "Yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lanjutkan!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/logout");
        }
      });
    },
  },
};
</script>

<style></style>
