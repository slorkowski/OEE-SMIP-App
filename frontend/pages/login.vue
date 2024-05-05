<script setup lang="ts">
const authenticator = ref<string>();
const role = ref<string>();
const username = ref<string>();
const password = ref<string>();

const formValid = ref<boolean>();
const loading = ref(false);



function required(value: string): string | boolean {
  return !!value || "This field is required";
}

function onSubmit() {
  if(!formValid.value) {
    return;
  }

  // TODO: set `loading` while login is processing, then redirect to home page

  console.log({
    authenticator,
    role,
    username,
    password,
  });
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
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" block :loading="loading">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
