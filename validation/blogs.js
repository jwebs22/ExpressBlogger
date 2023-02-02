const validateBlogData = (blogData) =>
{
    //Validation code here.
    if (blogData.title === undefined || typeof(blogData.title) !== "string") {
		// title is required and it must be a string
		return {
			isValid: false,
			message: "Blog title is required and it must be a string"
		}
	}

	if (blogData.text === undefined || typeof(blogData.text) !== "string") {
		// text is required and it must be a string
		return {
			isValid: false,
			message: "Blog text is required and it must be a string"
		}
	}

	if (blogData.author === undefined || typeof(blogData.author) !== "string") {
		// author is required and it must be a string
		return {
			isValid: false,
			message: "Blog author is required and it must be a string"
		}
	}
}

module.exports = {
	validateBlogData,
}