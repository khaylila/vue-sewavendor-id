<template>
  <div class="container">
    <nav class="navbar navbar-dark navbar-expand-lg bg-purple">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="./../assets/logo.png"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          Sewavendor.id
        </a>
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
              <a class="nav-link active" aria-current="page" href="/"
                >Dashboard</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/merchant">Merchant</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
    <section id="main" style="min-height: 100vh" class="py-4">
      <div class="container">
        <!-- header -->
        <div
          class="bg-white shadow-sm p-3 d-lg-flex justify-content-between mb-3 align-items-end"
        >
          <h2>Dashboard</h2>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active small" aria-current="page">
              Dashboard
            </li>
          </ol>
        </div>
        <!-- body -->
        <div class="shadow-sm">
          <div class="card rounded-0 border-0 color-gray-800">
            <div class="card-header bg-white">
              <h5>Example Card</h5>
            </div>
            <div class="card-body color-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
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
export default {
  name: "HomeView",
};
</script>
