export class AuthService {
  isLoggenIn = false;

  isAuth() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggenIn);
      }, 1);
    });
  }

  logIn() {
    this.isLoggenIn = true;
  }
  logOut() {
    this.isLoggenIn = false;
  }
}

