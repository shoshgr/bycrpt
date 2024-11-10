export class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  
    constructor(userId: string, firstName: string, lastName: string, email: string, phone: string, address: string, password: string) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.password = password;
    }
  }
  