const state = {
	history: null,
}

const getters = {
	getHistory: state => {
		state.history = state.history || JSON.parse(sessionStorage.getItem('HISTORY'))
		return state.history;
	}
}


const actions = {
	setHistory({
		commit
	}, history) {
		commit("HISTORY", history);
	}
}

const mutations = {
	HISTORY(state, history) {
		state.history = Object.assign({},state.history,{[history.id]:history});
		sessionStorage.setItem('HISTORY', JSON.stringify(state.history));
	}
}


export default {
	state,
	getters,
	actions,
	mutations
}
