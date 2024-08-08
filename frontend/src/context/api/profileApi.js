import { api } from './index'

export const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query: (params) => ({
                url: '/admin/profile',
                params
            }),
            providesTags: ["Profile", "Admin"]
        }),
        deleteProfile: build.mutation({
            query: (id) => ({
                url: `/profile/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Profile"]
        }),
        updateProfile: build.mutation({
            query: ({ id, body }) => ({
                url: `/profile/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Profile"]
        })
    }),
})

export const {
    useGetProfileQuery,
    useDeleteProfileMutation,
    useUpdateProfileMutation
} = profileApi
