const projects = require("../projects/projects-model")

function checkProjectsID() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if (project) {
                    req.project=project
                    next()
                } else {
                    res.status(404).json({
                        message:"Project not found",
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message:"Unable to get data",
                })
            })
    }
}

function checkProjectData(){
    return (req, res, next) => {
        console.log("middleware error", req.body)
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({
                message:"Missing description or name",
            })
        }
        next()
    }
}

module.exports = {
    checkProjectsID,
    checkProjectData
}