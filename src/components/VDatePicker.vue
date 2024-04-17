<template>
  <Calendar />
  <DatePicker v-model="date" />
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

export default {
  name: "VDatePicker",
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>

<style></style>
