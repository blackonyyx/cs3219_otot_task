const functions = require('@google-cloud/functions-framework');
const axios = require('axios');
const url = require('url');
/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.func =  functions.http('queryrecipe', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    const query = JSON.parse(JSON.stringify(url.parse(req.url,true).query));
    const obj = {}
    const expectedField = new Set(['name', 'ingredients', 'tags', 'maxPrepareTime', 'maxCookTime',  'maxSugar', 'maxAddedSugar', 'maxNetCarbs']);
    // const body = JSON.parse(JSON.stringify(body.parse(req.body,true).query))
    const tagFields = new Set(['special_diet', 'religious', 'allergy1', 'allergy2', 'allergy3', 'allergy4'])
    const sortingField = new Set(['byCalories', 'byFat'])
    const allTags = new Set(['name', 'ingredients', 'tags', 'maxPrepareTime', 'maxCookTime',  'maxSugar',
            'maxAddedSugar', 'maxNetCarbs', 'special_diet', 'religious', 'allergy1', 'allergy2', 'allergy3', 'allergy4','byCalories', 'byFat']);
    // Special diet: 'vegan', 'keto', 'vegetarian', 'pescatarian', 'paleo'
    // Religious: 'pork-free', 'beef-free'
    // allergy: 'dairy-free', 'gluten-free', 'shellfish-free', 'peanut-free'
    // by: byCalories
    if (!(query.hasOwnProperty('name') && query.hasOwnProperty('ingredients'))) {
        return res.status(400).json({
            mandatoryFields: ['name', 'ingredients'],
            message: `You did not fill in the mandatory fields: 'name', 'ingredients' for the query`
        })
    }
    // filtering tags
    const sortingConditions = {}
    const filterTags = new Set()
    for (q in query) {
        if (expectedField.has(q) && query[q].trim() !== "") {
            obj[q] = query[q]
        } else if (tagFields.has(q) && query[q].trim() !== "") {
            filterTags.add(q)
        }else if (sortingField.has(q) && query[q].trim() !== "") {

            sortingConditions[q] = query[q]
        } else if (allTags.has(q)) {

            continue
        } else {
            return res.status(400).json({
                field: q,
                message: `${q} is not an expected field nor optional field`
            })
        }
    }
    console.log(obj)
    console.log(sortingConditions)
    console.log(filterTags)
    /** 
     * perform internal filters, 
     * 1. Always Healthy Recipe -> < 700 kCals per serving
     * 2. Has only all tag in special diet , religous or allergy 1, 2, 3, 4
     * */ 
     const filters = [
        (data) => {
            let v = true;
            for (tag of filterTags) {
                v  = data.tags.includes(filterTags[tag]) && v
            }
            return v;
        } ,
        (data) => {
            let v = true;
            console.log(data)
            for (q in sortingConditions) {
                // console.log(q, sortingConditions[q])
                if (q === 'byCalories') {
                    v = (data.nutrients.caloriesKCal < parseFloat(sortingConditions[q])) && v
                } else if (q === 'byFat') {
                    v = (data.nutrients.fat < parseFloat(sortingConditions[q])) && v
                }
            }
            return v;
        }
    ]
    const options = {
    method: 'GET',
    url: 'https://low-carb-recipes.p.rapidapi.com/search',
    params: obj,
    headers: {
        'X-RapidAPI-Key': '5aa7119b89msh736b7e42d2f1187p100e3cjsn7b1c103ebee4',
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
    }
    };

    const makeObject = (data) => {
        return {
            name: data.name,
            tags: data.tags,
            prepareTime: data.prepareTime,
            prepareTime: data.cookTime,
            nutrients: {
                caloriesKCal: data.nutrients.caloriesKCal,
                totalCarbs: data.nutrients.totalCarbs,
                fat: data.nutrients.fat,
                protein: data.nutrients.protein,
            }
        }
    }

    axios.request(options).then(function (response) {
        const recipes = []
        for (d in response.data) {
            let x = true
            x = filters[0](response.data[d]) && x
            if ('byFat' in sortingConditions || 'byCalories' in sortingConditions) {
                console.log('fat filter')
                x = filters[1](response.data[d]) && x
            }

            if (x) {
                recipes.push(makeObject(response.data[d]))
            }
        }
        return res.status(200).json({
            data: recipes
        });
    }).catch(function (error) {
        console.error(error);
        return res.status(500).json({
            err: error,
            message: `Oops something went wrong!`
        })
    })
}
)

