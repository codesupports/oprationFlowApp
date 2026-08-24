import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

export const requestApi = createApi({
    reducerPath: "requestApi",

    baseQuery: fetchBaseQuery({
        baseUrl: " https://opration-flow-app.vercel.app/", // https://opration-flow-app.vercel.app/
    }),

    tagTypes: ["Requests"],

    endpoints: (builder) => ({
        getUsers: builder.query({
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
            query: ({ id, ...updatedRequest }) => ({
                url: `/api/users/${id}`,
                method: "PUT",
                body: updatedRequest,
            }),
            invalidatesTags: ["Requests"],
        }),
        deleteItemRequest: builder.mutation({
            query: (id) => {
                console.log("DELETE API ID:", id);

                return {
                    url: `/api/users/${id}`,
                    method: "DELETE",
                };
            },

            invalidatesTags: ["Requests"],
        })

    })
});

export const {
    useGetUsersQuery,
    useCreateRequestMutation,
    useUpdateRequestMutation,
    useDeleteItemRequestMutation,
} = requestApi;

const initialState = {
    requests: [],
    loading: false,
    error: null,
    loggedInUser: null,
    isEditData: null
};

// console.log('isEditData----------', initialState.isEditData)
const requestSlice = createSlice({
    name: "requests",
    initialState,

    reducers: {
        isLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
            localStorage.setItem("loggedInUser", JSON.stringify(action.payload));

        },
        isLoggedOutUser: (state, action) => {
            state.loggedInUser = action.payload;
            localStorage.removeItem("loggedInUser");
        },
        isEditRequest: (state, action) => {
            state.isEditData = action.payload
        },
        updateRequestData: (state, action) => {
            console.log('updateRequestData-', action)
        }
        //     addRequest: (state, action) => {
        //         state.requests.push(action.payload);
        //     },

        //     updateRequest: (state, action) => {
        //         const index = state.requests.findIndex(
        //             (request) => request.id === action.payload.id
        //         );

        //         if (index !== -1) {
        //             state.requests[index] = action.payload;
        //         }
        //     },

        //     // deleteRequest: (state, action) => {
        //     //     state.requests = state.requests.filter(
        //     //         (request) => request.id !== action.payload
        //     //     );
        //     // },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                requestApi.endpoints.getUsers.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                requestApi.endpoints.getUsers.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    // API ka data Redux state mein
                    state.requests = action.payload.users;
                }
            )
            .addMatcher(
                requestApi.endpoints.getUsers.matchRejected,
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
    updateRequestData
} = requestSlice.actions;

export default requestSlice.reducer;