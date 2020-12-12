import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/app.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        comments: [],
        user: null
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        },
        setComments(state, payload) {
            state.comments = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        fetchPosts(context) {
            axios.get('post').then((response) => {
                context.commit('setPosts', response.data.post);
            });
        },
        fetchComments(context) {
            axios.get('comment').then((response) => {
                context.commit('setComments', response.data.comment);
            });
        },
        authUser(context) {
            return new Promise((resolve) => {
                axios.post('auth').then((response) => {
                    if (response.data.authenticated) {
                        context.commit('setUser', response.data.user);
                    } else {
                        context.commit('setUser', false);
                    }

                    resolve();
                });
            });
        }
    },
    getters: {
        getPostById(state) {
            return function (id) {
                return state.posts.filter((post) => {
                    return post.id == id;
                }, this.id)[0];
            }
        },
        getPostComments(state) {
            return function (id) {
                return state.comments.filter((comment) => {
                    return comment.postID == id;
                }, this.id);
            }
        },
        getCommentById(state) {
            return function (id) {
                return state.comments.filter((comment) => {
                    return comment.id == id;
                }, this.id)[0];
            }
        }
    }
})