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
            return process.env.NODE_ENV === 'production'
                ? process.env.VUE_APP_API_HOST + path
                : path
        },
	},
}
