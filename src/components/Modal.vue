<template>
  <div
    class="modal fade"
    id="modalBS"
    tabindex="-1"
    aria-labelledby="modalBSLabel"
    aria-hidden="true"
    @click.self="closeModal"
    @keyup.esc="closeModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <template v-if="isForm">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalBSLabel">{{ title }}</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click.self="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-outline-secondary"
                type="button"
                data-bs-dismiss="modal"
                @click.self="closeModal"
              >
                Tutup
              </button>
              <slot name="footer"></slot>
            </div>
          </form>
        </template>
        <template v-else>
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalBSLabel">{{ title }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.self="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <template v-if="useBtnClose">
              <button
                class="btn btn-outline-secondary"
                type="button"
                data-bs-dismiss="modal"
                @click.self="closeModal"
              >
                Tutup
              </button>
            </template>
            <slot name="footer"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
let myModal = null;
export default {
  name: "Modal",
  props: ["title", "isForm", "useBtnClose"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    hideModal() {
      myModal.dispose();
      this.$emit("dispose");
    },
  },
  mounted() {
    myModal = new Modal(document.getElementById("modalBS"), {});
    myModal.show();
  },
  unmounted() {
    console.log("unmounted");
    // Get the <body> tag
    const bodyTag = document.body;

    // Add styles to the body
    bodyTag.style.overflow = "auto";
    bodyTag.style.paddingRight = "0";
  },
};
</script>

<style></style>
