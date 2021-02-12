module.exports = {
	lintOnSave: false,
	configureWebpack: {
		resolve: {
			alias: {
				"Plugins": "@/plugins",
			}
		}
	}
}
