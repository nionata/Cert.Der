require('dotenv').config()

export default
{

	computed:
	{
		isSecureSite()
		{
			return window.location.href.includes('secure')
		},
	},

	methods:
	{
        getPath(path)
        {
			if (this.isSecureSite)
				path = 'secure/' + path

            return process.env.NODE_ENV === 'production'
                ? process.env.VUE_APP_API_HOST + path
                : path
        },
	},
}
