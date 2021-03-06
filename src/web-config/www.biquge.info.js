export default {
	id:"m001",
	webUrl:'http://www.biquge.info',//网站地址
	search:{//搜索相关
		searchUrl:'http://www.biquge.info/modules/article/search.php?searchkey=',
		selector:{//搜索列表选择器
			list:"#wrapper > table > tbody > tr:not(:nth-child(1))",//列表
			name:"td:nth-child(1) > a",//小说名称
			bookUrl:"td:nth-child(1) > a|href",//书籍链接
			newChapter:"td:nth-child(2) > a",//最新章节
			newChapterUrl:"td:nth-child(2) > a|href",//最新章节地址
			author:"td:nth-child(3)",//作者
			words:"td:nth-child(4)",//字数
			updateNow:"td:nth-child(5)",//最近更新时间
			start:"td:nth-child(6)",//状态
		}
	},
	detail:{
		list:"#list > dl > dd > a",//章节列表
		chapterUrl:"a|href",//章节列表
		introduction:"#intro p",//简介
		homeImg:"#fmimg img|src",//封面
		name:"#info > h1",//小说名称
		type:"#info > p:nth-child(3)",//小说类别
		author:"#info > p:nth-child(2)",//作者
		updateNow:"#info > p:nth-child(4)",//最近更新时间
		startIndex:5,//列表开始章节，因为有些网站会吧最新的章节显示在最前面
	},
	content:{
		text:"#content"
	}
	
}