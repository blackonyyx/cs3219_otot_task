Contact = require('../model/contactModel');

// handle index actions

exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            req.status(404).json({
                status: "error",
                message: err,
            });
        }
        res.status(200).json ( {
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// create contact actions
exports.new = function (req, res) {
    let contactDetails = {
        name: req.body.name ? req.body.name : contact.name,
        gender: req.body.gender,
        email: req.body.email,
        phone : req.body.phone
    }
    let contact = new Contact(contactDetails);

    contact.save(function (err) {
        if (err) {
            res(err, null);
            return;
        }
        res.json (201, {
            message: 'contact has been created',
            data: contact
        })
    });
};

// Contact view
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.send(404 , {
                error: err
            });
        }
        res.json(200, {
            message: 'Contact details are loading',
            data: contact
        });
    });
};

// Contact update
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        // save contact and check for errors
        contact.save(function (err) {
            if (err) {
                res.json(500, {
                    'error': err
                });
            }
            res.json( 200, {
                message: 'Contact Info updated',
                data : contact
            });
        });
    });
};

// Contact delete
exports.delete = function (req, res) {
    Contact.remove({
        _id : req.params.contact_id
    }, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(200, {
            status: "success",
            message: `Contact ${ contact.name } deleted successfully`
        })
    })
}
