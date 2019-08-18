var express = require('express');
var router = express.Router();
var MenuItem = require('../models/menu');
var request = require('request');
var cheerio = require('cheerio');

router.route('/todaysmenu')
    .get((req, res) => {
        request('http://dining.rice.edu/', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let menus = []
                $('.item').each((index, value) => {
                    var servery = {};
                    var name = $(value).find('.servery-title').text().trim();
                    servery.name = name;
                    servery.menu = [];
                    $(value).find('.menu-item').each((i, v) => {
                        var item = $(v).text();
                        if (!item.toLowerCase().includes('open')) {
                            servery.menu.push({ name: item });
                        }
                    })
                    menus.push(servery);
                })
                return res.send({
                    confirmation: "Success",
                    data: menus
                })
            } else {
                return res.send({
                    confirmation: "Error",
                    data: error
                })
            }
        })
    })

router.route('/menuitem')
    .get((req, res) => {
        MenuItem.findOne({ name: req.query.name })
            .then(item => {
                if (item) {
                    return res.send({
                        confirmation: "Success",
                        data: item
                    })
                } else {
                    let newMenuItem = new MenuItem();
                    newMenuItem.name = req.query.name;
                    newMenuItem.save()
                        .then(item => {
                            return res.send({
                                confirmation: "Success",
                                data: item
                            })
                        })
                        .catch(error => {
                            return res.send({
                                confirmation: "Error",
                                data: error
                            })
                        })
                }

            })
            .catch(error => {
                return res.send({
                    confirmation: "Error",
                    data: error,
                })
            })
    })
    .put((req, res) => {
        const id = req.body.id;
        const rating = req.body.rating;
        MenuItem.findByIdAndUpdate(id, {
            $inc: { ratingTotal: rating, numRatings: 1 }
        }, { new: true, useFindAndModify: false })
            .then(item => {
                const expiration = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
                console.log(expiration.toString());
                res.cookie(id, { id: id, rating: rating }, { expires: expiration });
                return res.send({
                    confirmation: "Success",
                    data: item
                })
            })
            .catch(error => {
                return res.send({
                    confirmation: "Error",
                    data: error
                })
            })
    })

router.route('/cookies')
    .get((req, res) => {
        return res.send(req.cookies);
    })

module.exports = router