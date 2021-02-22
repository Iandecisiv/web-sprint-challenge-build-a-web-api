const actions = require("../actions/actions-model")

function checkActionsID() {
    return(req, res, next) => {
        actions.get(req.params.id)
            .then((action) => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(404).json({
                        message:"Error  action not found",
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

function checkActionData() {
    return (req, res, next) => {
        console.log("error from the middle ware",req.body)
        if (!req.body.description || !req.body.notes) {
            return res.status(400).json({
                message:"Missing description and or notes",
            })
        }
        next()
    }
}

module.exports = {
    checkActionsID,
    checkActionData,
}