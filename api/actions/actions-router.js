const express = require("express")
const userActions = require("./actions-model")
const { checkActionsID, checkActionData}= require("../middleware/actions")
const {checkProjectsID} = require("../middleware/projects")

const router = express.Router()

router.get("/actions", (req, res, next) => {
    userActions.get()
        .then((action) => {
            res.json(action)
        })
        .catch((error)=>{
            next(error)
        })
})

router.get("/actions/:id", checkActionsID(), (req, res, next) => {
   res.json(req.action)
})

router.post("/actions/:id", checkProjectsID(), checkActionData(), (req, res, next) => {
    let body = req.body
    body["project_id"]= req.params.id
    console.log("post request error",)
    userActions.insert(body)
        .then((action) => {
            console.log(action)
            res.status(201).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

router.put("/actions/:id", checkActionsID(), checkActionData(), (req, res, next) => {
    let body = req.body
    let id = req.params.id
    console.log("error in the put request",)
    userActions.update(id,body)
    .then((action)=>{
        console.log(action)
        res.status(201).json(action)
    })
    .catch((error)=>{
        next(error)
    })
})

router.delete("/actions/:id", checkActionsID(), (req, res, next) => {
    userActions.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message:"The action has been deleted",
                })
            } else {
                res.status(404).json({
                    message: "This user action could not be found"
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})


module.exports = router