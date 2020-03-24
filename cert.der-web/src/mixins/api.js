require('dotenv').config()

export default
{

	computed:
	{
		// ...
	},

	methods:
	{
        getPath(path)
        {
			if (window.location.href.includes('/secure'))
				path = 'secure/' + path

            return process.env.NODE_ENV === 'production'
                ? process.env.VUE_APP_API_HOST + path
                : path
        },
	},
}
