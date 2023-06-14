import { useRouter } from "vue-router";
import SessionStorageService from "./sessionStorage";
const router = useRouter();

class AuthenticationService {
  static authUser = SessionStorageService.decodeToken();

  public static logoutUser() {
    SessionStorageService.clear();
    location.replace("/login");
  }
}

export default AuthenticationService;
