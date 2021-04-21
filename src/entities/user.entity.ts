export interface UserRegister {
  email: string;
  password: string;
}

export interface Item {
  email_id: string;
  hash?: string;
  hashPassword: string;
}

export interface UserItem {
  Item: Item;
}
