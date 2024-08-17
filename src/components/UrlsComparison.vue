<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h1>Submit URL address</h1>

        <label for="url1">Enter URL address</label>
        <input
          v-model="url1"
          name="url1"
          placeholder="https://..."
          aria-label="original URL address"
          autofocus
          :class="{ input_error: !!url1Error }"
          @blur="validateUrl"
          @click="clearSuccessMsg"
        />
        <div class="error_message">{{ url1Error }}</div>

        <label for="url2">Confirm URL address</label>
        <input
          v-model="url2"
          name="url2"
          placeholder="https://..."
          aria-label="confirmation URL address"
          :class="{ input_error: !!url2Error }"
          @blur="validateUrl"
          @click="clearSuccessMsg"
        />
        <div class="error_message">{{ url2Error }}</div>

      <div class="error_message">{{ urlsDontMatchError }}</div>

      <button
        type="submit"
        title="Submit your form"
        :disabled="!isFormValid"
      >
        Submit
      </button>

      <div
        class="success_message"
        v-if="successMessage"
      >
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { addNewUrl } from "../api";

export default {
  name: 'UrlsComparison',
  data() {
    return {
      url1: '',
      url2: '',
      url1Error: '',
      url2Error: '',
      urlsDontMatchError: '',
      successMessage: '',
    };
  },
  computed: {
    isFormValid() {
      return !this.url1Error && !this.url2Error && !this.urlsDontMatchError && !!this.url1 && !!this.url2;
    },
  },
  methods: {
    validateUrl() {
      const httpsPattern = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/;

      if (!httpsPattern.test(this.url1)) {
        this.url1Error = 'Please enter a valid HTTPS address';
      } else if (!httpsPattern.test(this.url2)) {
        this.url1Error = '';
        this.url2Error = 'Please enter a valid HTTPS address';
      } else if (this.url1 !== this.url2) {
        this.url2Error = '';
        this.urlsDontMatchError = 'Provided URLs should be the same';
      } else {
        this.url1Error = '';
        this.url2Error = '';
        this.urlsDontMatchError = '';
      }
    },
    handleSubmit() {
      if (this.isFormValid) {
        this.successMessage = 'Address submitted successfully!';
        addNewUrl(this.url1);
        this.url1 = '';
        this.url2 = '';
        this.urlError = '';
      }
    },
    clearSuccessMsg() {
      this.successMessage = '';
    }
  },
}
</script>

<style>
:root {
  --brand-danger: #ff0000;
}

form {
  font-size: 1.5rem;
  padding: 1rem;
}

label {
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;
}

input {
  font-size: 1.5rem;
  padding: 0.5rem;
  width: 30rem;
}

.input_error {
  border: 1px solid red;
}

button {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.error_message {
  height: 1.5rem;
  color: var(--brand-danger);
}
.success_message {
  height: 1.5rem;
  margin-top: 0.5rem;
  color: green;
}
</style>
