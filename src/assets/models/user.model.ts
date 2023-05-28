export interface UserModel {
  name: string;
  email: string;
  nickname: string;
  id: string;
}

export class User implements UserModel {
  name = '';
  email = '';
  nickname = '';
  id = '';

  constructor(name?: string, email?: string, password?: string, nickname?: string, id?: string) {
    name ? this.name = name : this.name = '';
    email ? this.email = email : this.email = '';
    nickname ? this.nickname = nickname : this.nickname = '';
    id ? this.id = id : this.id = '';
  }
}

export interface UsernameModel {
  name: string;
  nickname: string;
}

export class Username implements UsernameModel {
  name = '';
  nickname = '';
  constructor(name?: string, nickname?: string) {
    this.name = name || '';
    this.nickname = nickname || '';
  }
}
