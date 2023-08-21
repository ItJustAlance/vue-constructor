import jwtDecode from "jwt-decode";

let storeAuth;

export function getAccessToken() {
  if (!storeAuth) return undefined;
  return storeAuth.state.accessToken;
}

export function getRefreshTokenId() {
  if (!storeAuth) return undefined;
  return storeAuth.state.refreshTokenId;
}

export function getStoreAuth() {
  console.log("getStoreAuth storeAuth", storeAuth);
  return storeAuth;
}

export function getAccessTokenInfo() {
  const accessToken = getAccessToken();
  if (!accessToken) return null;
  return jwtDecode(accessToken);
}

export function setStateAuthInjectionToApi(injStoreAuth) {
  console.log("setStateAuthInjectionToApi", injStoreAuth);
  storeAuth = injStoreAuth;
}

export function getCurrentUserRole() {
  return storeAuth.state.user ? storeAuth.state.user.roleId : "";
}

export function getOrganizationId() {
  return storeAuth.state.user ? storeAuth.state.user.orgId : "";
}
