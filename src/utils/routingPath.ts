const baseUrl = "api/v1"
export const basePath = {
    User: {
        base: "/user",
        forgetPassword: "/forgotpassword",
        login: "/login",
        signup: "/signup",
        resetPassword: "/resetpassword/:id/:token"
    },
    Review: {
        base: "/review",
        list: "/list",
        details: "/details/:id",
        update: "/update/:id",
        like: "/like/:id",
        delete: "/delete/:id",
        create: "/create/:cid",
    },
    Company: {
        base: "/company",
        list: "/list",
        details: "/details/:id",
        update: "/update/:id",
        delete: "/delete/:id",
        create: "/create",
    }
}