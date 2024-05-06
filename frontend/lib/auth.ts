import { AuthenticationRequestDocument, AuthenticationVerificationDocument } from "~/generated/graphql/operations";



/** Class used to express errors with the authentication flow. */
export class AuthenticationError extends Error {}
export type OnLoginFn = (token: string | undefined) => Promise<void>;



export interface AuthenticatorLoginInput {
  authenticator: string;
  role: string;
  username: string;
  password: string;

  mutationId?: string;
}

/**
 * @param data Credentials to use when requesting the JWT.
 */
export async function loginWithAuthenticator(
  data: AuthenticatorLoginInput,
): Promise<void> {
  const { client } = useApolloClient("noauth");
  const { onLogin } = useApollo();

  const authenticationRes = await client.mutate({
    mutation: AuthenticationRequestDocument,
    variables: {
      input: {
        authenticator: data.authenticator,
        role: data.role,
        userName: data.username,
        clientMutationId: data.mutationId,
      },
    },
  });

  const { challenge, message } = authenticationRes.data?.authenticationRequest?.jwtRequest ?? {};
  if(authenticationRes.errors) {
    throw new AuthenticationError("GraphQL errors from authentication request", {
      cause: authenticationRes.errors,
    });
  }
  if(!challenge) {
    throw new AuthenticationError(message || "Bad response from authentication request mutation");
  }

  const verificationRes = await client.mutate({
    mutation: AuthenticationVerificationDocument,
    variables: {
      input: {
        authenticator: data.authenticator,
        signedChallenge: `${challenge}|${data.password}`,
        clientMutationId: data.mutationId,
      },
    },
  });

  if(verificationRes.errors) {
    throw new AuthenticationError("GraphQL errors from authentication verification", {
      cause: verificationRes.errors,
    });
  }

  const jwt = verificationRes.data?.authenticationValidation?.jwtClaim;
  if(!jwt) {
    throw new AuthenticationError("Received empty JWT claim from authentication verification mutation");
  }

  return onLogin(jwt);
}
