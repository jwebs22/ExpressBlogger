const validateBlogData = (blogData) =>
{
    //Validation code here.
    if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 39) {
		// title is required and it must be a string < 40 char including white space
		return {
			isValid: false,
			message: "Blog title is required and it must be a string under 40 charactors in length"
		}
	}

	if (blogData.text === undefined || typeof(blogData.text) !== "string") {
		// text is required and it must be a string
		return {
			isValid: false,
			message: "Blog text is required and it must be a string"
		}
	}

	if (blogData.author === undefined || typeof(blogData.author) !== "string" || blogData.author.length > 39) {
		// author is required and it must be a string < 40 char including white space
		return {
			isValid: false,
			message: "Blog author is required and it must be a string under 40 charactors in length"
		}
	}

    //Stretch Goals #1
    //check to see if category is an array (not in stretch goal, but I saw this in users and wanted to put it in because it will help me to learn this --with a project I'm working on)
    if (blogData.category === undefined || !Array.isArray(blogData.category) || blogData.category.length === 0) {
		return {
			isValid: false,
			message: "category must be an array and must have length"
		}
	}

    if (blogData.category !== undefined && blogData.category.length > 0 && blogData.category.length > 10) {
        //must be defined, length between 0 and 10.
        return{
            isValid: false,
            message: "You must have at least one catagory, but no more than 10."
        }
        }

    // We are going to use .filter() to iterate through categories and will only bring through values that are NOT strings. Then we will check if the resultant array has any length, in which case we know there are non-string values in the array.
	const nonStringCategories = blogData.category.filter((category)=>{

		// If the callback function in .filter() returns true, then the item will be kept in the resultant array. If the callback returns false, the item will be filtered out
		if (typeof(category) !== 'string') {
			return true
		} else {
			return false
		}
	})

	console.log("nonStringCategories ", nonStringCategories)

	if (nonStringCategories.length > 0) {
		return {
			isValid: false,
			message: "categories must be an array of strings"
		}
	}    
    
    //Not working:
    // if (blogData.category !== "Lorem") {
    // //must be Lorem, ipsum, dolor, sit, or amet.
    // return{
    //     isValid: false,
    //     message: "Allowed categories are: Lorem, ipsum, dolor, sit, or amet"
    // }
    // }

    return {
        isValid: true
    }

}
module.exports = {
	validateBlogData,
}