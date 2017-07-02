import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: { // 共享的数据 
		arr: [],
		good: null || (window.sessionStorage.good && JSON.parse(window.sessionStorage.good)),
		addGood: null || (window.sessionStorage.addGood && JSON.parse(window.sessionStorage.addGood))
	},
	mutations: { // 修改数据的唯一途径
		ADD_GOODSNUM(state, newItem) {
			var flag = false;
			state.arr.map(function(item){
			if(newItem.title == item.title) {
					item.count++;
					console.log('add')
					flag = true;
				}
			});
			if(flag == false) {
				console.log('first add');
				// newItem.count = 1;
				Vue.set(newItem, 'count', 1);
				Vue.set(newItem, 'singleFlag', false);
				state.arr.push(newItem);
			}
			console.log(state.arr)
		},
		REDUCE_GOODSNUM(state, item) {
			state.arr.map(function(a, i) {
				if (item.title == a.title) {
					a != item && item.count--;
					a.count--;
					if (a.count < 1) {
						state.arr.splice(i, 1);
					}
				} 
			})
			
		},
		CHANGEGOOD(state, item) {
			state.good = item;
			window.sessionStorage.good = JSON.stringify(item);
		},
		ADD_ADSGOOD(state, item) {
			state.addGood = item;
			window.sessionStorage.addGood = JSON.stringify(item);

		}
	},
	actions: { // 异步操作的事件
	
	},
	getters: { 
		// 这里的getters相当于就是实例中我们用到的计算属性
		allPrice(state) {
			let money = 0;
			state.arr.map(item => {
				if(item.singleFlag == true) {
					money += item.count * parseFloat(item.tuan_price);
				}		
			});
			return money;
		},
		goodsCount(state) {
			let allCount = 0;
			state.arr.map(item => {
				if(item.singleFlag == true){
					allCount += item.count;
				}	
			});
			return allCount;
		},
		oPrice(state) {
			let oMoney = 0;
			state.arr.map(item => {
				if(item.singleFlag == true) {
					oMoney += item.count * parseFloat(item.oprice);
				}		
			});
			return oMoney;
		},
		differencePrice(state) {
			let dMoney = 0;
			state.arr.map(item => {
				if(item.singleFlag == true) {
					dMoney += (item.count * parseFloat(item.oprice) - item.count * parseFloat(item.tuan_price));
				}		
			});
			return dMoney;
		}
	}
})