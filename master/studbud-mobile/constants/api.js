import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

//axios.defaults.baseURL = "http://192.168.1.20:3000/api";
// might need to take out /app
axios.defaults.baseURL = "http://192.168.1.6:5000/api/app";

//const fakeGroupId = "5b35a4952e6b8e49c013b8a5";
const fakeGroupId = "5b58f3bddb5991556887d023";

class MeetupApi {
  constructor() {
    this.groupId = fakeGroupId;
    // might need /app/groups
    this.path = `/groups/${this.groupId}/meetups`;
  }

  async fetchGroupMeetups() {
    try {
      const { data } = await axios.get(this.path);

      return data.meetups;
    } catch (e) {
      throw e;
    }
  }

  async createGroupMeetups(args) {
    try {
      const res = await axios.post(`${this.path}/new`, { ...args });
      console.log(res);
      return res;
    } catch (e) {
      throw e;
    }
  }
}
export { MeetupApi };

class GroupApi {
  constructor() {
    //this.groupId = fakeGroupId;
    this.path = `/groups`;
  }

  async fetchAllGroups() {
    try {
      const { data } = await axios.get(this.path);

      return data.groups;
    } catch (e) {
      console.log(e);
    }
  }

  async createGroup(args) {
    try {
      const res = await axios.post(`${this.path}/new`, { ...args });
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
export { GroupApi };

// export const fetchMeetups = () =>
//   fetch('http://192.168.1.32:3000/api/meetups')
//   .then(res => res.json());

class UserApi {
  constructor() {
    this.path = `/users`;
  }

  async login(args) {
    try {
      const { data } = await axios.post(`${this.path}/login`, args);
      //console.log(data);
      return data;
    } catch (e) {
      throw e;
    }

    /*await axios
      .post(`${this.path}/login`, args)
      .then(res => {
        //console.log(res.data);
        const { token } = res.data;
        console.log(token);
        AsyncStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        return decoded;
      })
      .catch(err => console.log(err));*/
  }

  async signup(args) {
    try {
      const res = await axios.post(`${this.path}/register`, { ...args });
      console.log(res.data);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
export { UserApi };
