angular.module('RiceEats')
    .controller('mainCtrl', function ($scope, $http, menuService) {

        $scope.menus = [];

        $scope.initializeMenuData = function (menus) {
            $http.get('/api/cookies')
                .then(data => {
                    const cookies = data.data;
                    console.log(cookies);
                    for (let i = 0; i < menus.length; i++) {
                        let servery = menus[i];
                        servery.index = i;
                        for (let j = 0; j < servery.menu.length; j++) {
                            let itemName = servery.menu[j].name.toLowerCase();
                            $http.get(`/api/menuitem?name=${itemName}`)
                                .then(data => {
                                    let entry = data.data.data;
                                    servery.menu[j].numRatings = entry.numRatings;
                                    let temp = entry.ratingTotal / entry.numRatings;
                                    servery.menu[j].avgRating = temp.toFixed(1);
                                    const id = entry._id;
                                    servery.menu[j]._id = id;
                                    if (cookies[id]) {
                                        servery.menu[j].rating = cookies[id].rating;
                                        servery.menu[j].submitted = true;
                                    } else {
                                        servery.menu[j].rating = null;
                                        servery.menu[j].submitted = false;
                                    }
                                    servery.menu[j].index = j;
                                })
                        }
                    }
                })
        }

        menuService.getMenus().success(data => {
            const tempMenus = data.data;
            const serveries = ["Baker", "North", "Seibel", "SidRich", "South", "West"]
            for (let i = 0; i < tempMenus.length; i++) {
                if (serveries.includes(tempMenus[i].name)) {
                    $scope.menus.push(tempMenus[i])
                }
            }
            $scope.initializeMenuData($scope.menus);            
        })

        $scope.setRating = function (serveryIdx, itemIdx, rating) {
            let menuItem = $scope.menus[serveryIdx].menu[itemIdx];
            menuItem.rating = rating;
            menuItem.submitted = true;
            $http.put('/api/menuitem', {
                id: menuItem._id,
                rating: rating
            })
                .then(item => {
                    const updatedItem = item.data.data;
                    menuItem.numRatings = updatedItem.numRatings;
                    let total = updatedItem.ratingTotal;
                    let temp = total / menuItem.numRatings;
                    menuItem.avgRating = temp.toFixed(1);
                })
        }
    })