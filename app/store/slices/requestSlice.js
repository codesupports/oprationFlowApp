import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";


const baseUrl = process.env.NEXT_PUBLIC_API_URL; // From .env.local

export const requestApi = createApi({
    reducerPath: "requestApi",

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl, // https://opration-flow-app.vercel.app/
    }),

    tagTypes: ["Requests", "Users",],

    endpoints: (builder) => ({
        getRecentRequest: builder.query({
            query: () => "/api/users",
            providesTags: ["Requests"],
        }),
        createRequest: builder.mutation({
            query: (newRequest) => ({
                url: "/api/users",
                method: "POST",
                body: newRequest,
            }),
            invalidatesTags: ["Requests"],
        }),
        updateRequest: builder.mutation({
            query: (updatedRequest) => ({
                url: "/api/users",
                method: "PUT",
                body: updatedRequest,
            }),
            invalidatesTags: ["Requests"],
        }),
        // updateRequest: builder.mutation({
        //     query: ({ id, ...updatedRequest }) => ({
        //         url: `/api/users/${id}`,
        //         method: "PUT",
        //         body: updatedRequest,
        //     }),
        //     invalidatesTags: ["Requests"],
        // }),
        deleteItemRequest: builder.mutation({
            query: (id) => {
                console.log("DELETE API ID:", id);
                return {
                    url: `/api/users/${id}`,
                    method: "DELETE",
                };
            },

            invalidatesTags: ["Requests"],
        }),
        createUser: builder.mutation({ // CREATE NEW USER
            query: (newUser) => ({
                url: "/api/allusers",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),
        getAllUsers: builder.query({
            query: () => "/api/allusers",
            providesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/api/allusers/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...updatedRequest }) => ({
                url: `/api/allusers/${id}`,
                method: "PUT",
                body: updatedRequest,
            }),
            invalidatesTags: ["Users"],
        }),
    })
});

export const {
    useGetRecentRequestQuery,
    useCreateRequestMutation,
    useUpdateRequestMutation,
    useDeleteItemRequestMutation,
    useCreateUserMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation
} = requestApi;

const initialState = {
    requests: [],
    loading: false,
    error: null,
    loggedInUser: null,
    isEditData: null,
    showSelectedRequestData: null
};
console.log('creatSlice data', initialState.showSelectedRequestData)
const requestSlice = createSlice({
    name: "requests",
    initialState,

    reducers: {
        isLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
            sessionStorage.setItem("loggedInUser", JSON.stringify(action.payload));

        },
        isLoggedOutUser: (state, action) => {
            state.loggedInUser = action.payload;
            sessionStorage.removeItem("loggedInUser");
        },
        isEditRequest: (state, action) => {
            state.isEditData = action.payload
        },
        updateRequestData: (state, action) => {
            console.log('updateRequestData-', action)
        },
        showSelectedRequestData: (state, action) => {
            // console.log('action', action.payload)
            state.showSelectedRequestData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                requestApi.endpoints.getRecentRequest.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                requestApi.endpoints.getRecentRequest.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    // API ka data Redux state mein
                    state.requests = action.payload.users;
                }
            )
            .addMatcher(
                requestApi.endpoints.getRecentRequest.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message;
                }
            );
    },
});

export const {
    //addRequest,
    isEditRequest,
    // deleteRequest,
    isLoggedInUser,
    isLoggedOutUser,
    updateRequestData,
    showSelectedRequestData
} = requestSlice.actions;

export default requestSlice.reducer;