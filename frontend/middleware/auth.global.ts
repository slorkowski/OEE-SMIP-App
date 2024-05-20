import { useGraphQLUser } from "~/lib/auth";



export default defineNuxtRouteMiddleware(async (to) => {
  const user = useGraphQLUser();

  if(to.path !== "/login" && !user.value) {
    return navigateTo("/login");
  }
});
