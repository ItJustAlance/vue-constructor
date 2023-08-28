import { getSend } from "@/api/global";

export const ProgramsService = {
  getData() {
    return [];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  //   getCustomers(params) {
  //     const queryParams = params
  //       ? Object.keys(params)
  //         .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  //         .join('&')
  //       : '';
  //     return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
  //   }
  // };
  // eslint-disable-next-line no-unused-vars
  async getCustomers(params) {
    try {
      console.log("getCustomers", params);
      const result = await getSend("programs", params);
      console.log("ddd", result);
      return result;
    } catch (e) {
      console.log("error", e);
    }

    return;
  }
};
