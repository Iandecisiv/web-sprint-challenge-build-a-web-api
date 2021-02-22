const express = require("express")
const userProjects = require("../projects/projects-model")
const router = express.Router()
const {checkProjectsID, checkProjectData}=require("../middleware/projects")

router.get("/projects", (req, res, next) => {
    userProjects.get()
    .then((action) => {
        res.json(action)
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/projects/:id", checkProjectsID(), (req, res, next) => {
    res.json(req.project)
})

router.post("/projects", checkProjectData(), (req, res, next) => {
    let body = req.body
    // console.log("error in the post request",)
    userProjects.insert(body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch((error) => {
        next(error)
    })
})

router.put("/projects/:id",checkProjectsID(),  checkProjectData(), (req, res, next) => {
    let body = req.body
    let id = req.params.id
    
    userProjects.update(id,body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/projects/:id", checkProjectsID(), (req, res, next) => {
    userProjects.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message:"Project has been deleted",
                })
            } else {
                res.status(400).json({
                    message: "this project could not be found"
                })
            }
        }).
        catch((error) => {
            next(error)
        })
})

router.get("/projects/:id/actions", checkProjectsID(), (req, res, next) => {
    userProjects.getProjectActions(req.params.id)
    .then((project) => {
        res.json(project)
    })
    .catch((error) => {
        next(error)
    })
})

 module.exports = router