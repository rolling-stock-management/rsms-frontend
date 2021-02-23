<template>
  <b-collapse
    id="nav-collapse"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <b-link
            to="dashboard"
            class="nav-link"
            exact
            exact-active-class="active"
            >Dashboard</b-link
          >
        </li>
        <li class="nav-item">
          <b-link to="test" class="nav-link" exact exact-active-class="active"
            >Test</b-link
          >
        </li>
      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>Saved reports</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <b-link to="test" class="nav-link" exact exact-active-class="active"
            >Test</b-link
          >
        </li>
      </ul>
    </div>
  </b-collapse>
</template>

<script>
export default {}
</script>

<style scoped>
/*
 * Sidebar
 */

.sidebar {
  position: s;
  top: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
