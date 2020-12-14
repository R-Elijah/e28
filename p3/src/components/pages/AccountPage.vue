<template>
  <div id="account-page">
    <div v-if="user">
      <h4 data-test="welcome-message">Hello, {{ user.name }}!</h4>
      <button @click="logout" data-test="logout-button">Logout</button>

      <br />
      <h4>Current Subscriptions</h4>
      <ul>
        <li v-for="sub in subscriptions" v-bind:key="sub.id" data-test="sub">
          {{ sub.sub }}
        </li>
      </ul>

      <br /><br />
      <h4>Add a Subscription</h4>
      <p>
        Enter a username to subscribe to their posts below. You can only
        subscribe to someone who has previously posted.
      </p>
      <div id="inputs">
        <label for="user">Username:</label>
        <input
          type="text"
          v-model="newSub"
          placeholder="Username..."
          @click="clearErrors"
          @blur="validateAdd"
          id="newSub"
          data-test="add-sub-input"
        />
      </div>
      <button @click="addSub" data-test="add-sub-button">Add</button>
      <ErrorDisplay
        v-if="errors.type == 'Add'"
        v-bind:errors="errors.message"
      ></ErrorDisplay>
      <ClientErrorDisplay
        v-if="clientErrors && 'newSub' in clientErrors"
        v-bind:clientErrors="clientErrors"
      ></ClientErrorDisplay>
      <div id="success" v-if="showConfirmationMessage == 'Add'">
        <h3>Success!</h3>
      </div>

      <br /><br />
      <h4>Unsubscribe</h4>
      <p>
        Enter a username below to unsubscribe from their posts. You can only
        unsubscribe from someone you are already subscribed to (check subs
        above).
      </p>
      <div id="inputs">
        <label for="user">Username:</label>
        <input
          type="text"
          v-model="oldSub"
          placeholder="Username..."
          @click="clearErrors"
          @blur="validateDel"
          id="oldSub"
          data-test="del-sub-input"
        />
      </div>
      <button @click="delSub" data-test="del-sub-button">Unsubscribe</button>
      <ErrorDisplay
        v-if="errors.type == 'Del'"
        v-bind:errors="errors.message"
      ></ErrorDisplay>
      <ClientErrorDisplay
        v-if="clientErrors && 'oldSub' in clientErrors"
        v-bind:clientErrors="clientErrors"
      ></ClientErrorDisplay>
      <div id="success" v-if="showConfirmationMessage == 'Del'">
        <h3>Success!</h3>
      </div>
    </div>

    <div v-else>
      <h4>Login:</h4>
      <div id="inputs">
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="data.email"
          placeholder="Email..."
          @click="clearErrors"
          @blur="validateLogin"
          id="email"
          data-test="email-input"
        />

        <label for="pass">Password:</label>
        <input
          type="password"
          v-model="data.password"
          placeholder="Password..."
          @click="clearErrors"
          @blur="validateLogin"
          id="pass"
          data-test="password-input"
        />
      </div>
      <button @click="login" data-test="login-button">Login</button>
      <ErrorDisplay
        v-if="errors.type == 'Login'"
        v-bind:errors="errors.message"
      ></ErrorDisplay>
      <ClientErrorDisplay
        v-if="clientErrors"
        v-bind:clientErrors="clientErrors"
      ></ClientErrorDisplay>
    </div>
  </div>
</template>

<script>
import { axios } from "@/app.js";
import Validator from "validatorjs";
import ClientErrorDisplay from "@/components/ClientErrorDisplay.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";

export default {
  name: "",
  components: {
    ClientErrorDisplay,
    ErrorDisplay,
  },
  data() {
    return {
      errors: {},
      clientErrors: {},
      showConfirmationMessage: "",
      data: {
        email: "",
        password: "",
      },
      newSub: "",
      oldSub: "",
      subscriptions: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    loadSubscriptions() {
      if (this.user) {
        axios.get("subscription").then((response) => {
          this.subscriptions = response.data.subscription.map(
            (subscription) => {
              return subscription;
            }
          );
        });
      }
    },
    addSub() {
      if (this.clientErrors["newSub"]) {
        return;
      }
      let sub = this.newSub;
      // Check if the specified user name is Anonymous
      if (sub == "Anonymous" || sub == this.user.name) {
        this.errors = {
          type: "Add",
          // All return messages are formatted into double arrays due to the error message sfc expecting that.
          message: [
            ["You cannot subscribe to the default Anonymous user or yourself."],
          ],
        };
        return;
      }
      // check if the specified user name has any posts
      let exists = this.subscriptions.find(function (subscription) {
        return subscription.sub == sub;
      });
      if (exists) {
        this.errors = {
          type: "Add",
          message: [["You are already subscribed to this person."]],
        };
      } else {
        // check if the specified user name has any posts
        let posted = this.$store.state.posts.find(function (post) {
          return post.userName == sub;
        });
        if (posted === undefined) {
          this.errors = {
            type: "Add",
            message: [["There are no posts made by this user."]],
          };
        } else {
          axios.post("/subscription", { sub: sub }).then((response) => {
            if (response.data.errors) {
              this.errors = {
                type: "Add",
                message: [response.data.errors],
              };
            } else {
              this.showConfirmationMessage = "Add";
              this.loadSubscriptions();

              this.newsub = "";
              setTimeout(() => (this.showConfirmationMessage = ""), 2000);
            }
          });
        }
      }
    },
    delSub() {
      if (this.clientErrors["oldSub"]) {
        return;
      }
      let sub = this.oldSub;
      // check if the specified user name is subscribed to
      let exists = this.subscriptions.findIndex(function (subscription) {
        return subscription.sub == sub;
      });
      console.log(exists);
      if (exists == -1) {
        this.errors = {
          type: "Del",
          message: [["You are not subscribed to this person."]],
        };
      } else {
        axios
          .delete("/subscription/" + this.subscriptions[exists].id)
          .then((response) => {
            if (response.data.errors) {
              this.errors = {
                type: "Del",
                message: [response.data.errors],
              };
            } else {
              this.showConfirmationMessage = "Del";
              this.loadSubscriptions();

              this.oldSub = "";
              setTimeout(() => (this.showConfirmationMessage = ""), 2000);
            }
          });
      }
    },
    login() {
      if (this.clientErrors["email"] || this.clientErrors["password"]) {
        return;
      }
      axios.post("login", this.data).then((response) => {
        if (response.data.authenticated) {
          this.$store.commit("setUser", response.data.user);
          this.data.email = "";
          this.data.password = "";
        } else {
          this.errors = {
            type: "Login",
            message: [response.data.errors],
          };
        }
      });
    },
    logout() {
      axios.post("logout").then((response) => {
        if (response.data.success) {
          this.$store.commit("setUser", null);
        }
      });
    },
    clearErrors() {
      this.errors = {};
      this.clientErrors = {};
    },
    validateLogin() {
      let validator = new Validator(this.data, {
        email: "required|email",
        password: "required|alpha_dash",
      });

      this.clientErrors = validator.errors.all();

      return validator.passes();
    },
    validateAdd() {
      let validator = new Validator(
        { newSub: this.newSub },
        {
          newSub: "required|between:3,25",
        }
      );

      validator.setAttributeNames({ newSub: "user" });
      this.clientErrors = validator.errors.all();

      return validator.passes();
    },
    validateDel() {
      let validator = new Validator(
        { oldSub: this.oldSub },
        {
          oldSub: "required|between:3,25",
        }
      );

      validator.setAttributeNames({ oldSub: "user" });
      this.clientErrors = validator.errors.all();

      return validator.passes();
    },
  },
  watch: {
    user() {
      this.loadSubscriptions();
    },
  },
  mounted() {
    this.loadSubscriptions();
  },
};
</script>