const express = require("express")
const router= express.Router()
const authRoute= require('./auth.route');
const contactRoute = require('./contact.route');
const docRoute = require("./docs.route")

const route_array = [
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:"/contact",
        route:contactRoute
    },
    {
        path:"/docs",
        route:docRoute
    }
]


route_array.map((cur)=>{
   router.use(cur.path,cur.route);
})



module.exports = router;