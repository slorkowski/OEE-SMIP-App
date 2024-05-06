<script setup lang="ts">
import { loginWithAuthenticator } from "~/lib/auth";



const authenticator = ref<string>();
const role = ref<string>();
const username = ref<string>();
const password = ref<string>();

const formValid = ref<boolean>();
const loading = ref(false);
const errorMsg = ref<string>();



function required(value: string): string | boolean {
  return !!value || "This field is required";
}

async function onSubmit() {
  if(!formValid.value) {
    return;
  }

  errorMsg.value = undefined;
  loading.value = true;
  try {
    await loginWithAuthenticator({
      authenticator: authenticator.value!,
      role: role.value!,
      username: username.value!,
      password: password.value!,
    });
    navigateTo("/");
  } catch(err) {
    console.error(err);
    errorMsg.value = err instanceof Error
      ? err.message
      : "An error occurred logging in. Please check your credentials and try again.";
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" lg="6">
      <v-form v-model="formValid" @submit.prevent="onSubmit">
        <v-card :loading="loading">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="authenticator"
              label="Authenticator"
              :rules="[required]"
            />
            <!--
              This _could_ be a dropdown with specific roles, but GraphQL doesn't expose these roles.
              The roles are ostensibly "constructable" using the instance's ThinkIQ domain name,
              but we'll just have the user manually type it in here.
            -->
            <v-text-field
              v-model="role"
              label="Role"
              :rules="[required]"
            />
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[required]"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[required]"
            />
            <v-alert
              v-if="errorMsg"
              type="error"
              :title="errorMsg"
              closable
            />
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" block :loading="loading">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
