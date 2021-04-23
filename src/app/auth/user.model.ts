export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpireData: Date
  ) {}

  get token() {
    if (!this._tokenExpireData || new Date() > this._tokenExpireData) {
      return null;
    }

    return this._token;
  }
}
