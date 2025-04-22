const baseUrl = "api/v1"
export const basePath = {
    User: {
        base: "/user",
        login: "/login",
        signup: "/signup",
    },
    Books: {
        base: "/books",
        list: "/",
        details: "/:id",
        update: "/:id",
        delete: "/:id",
        create: "/",
    }
}