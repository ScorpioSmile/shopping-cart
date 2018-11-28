//创建表格
// 功能2：点击全选（表头中的多选框）实现表体中的全选功能以及总价格计算
// 功能3：点击加减按钮操作
//  ① 点击加减按钮实现数量加1和减1（数量限制至少是1，至多不限）
//  ② 并且实现当前行的多选框为选中状态，以及当前行小计的计算最后总价格的计算。
// 功能4：点击删除实现删除当前行
// 功能5：点击清空购物车实现表体中的清空功能和总价格归为0

var json = [
	{
		name: "自行车",
		num: "2",
		price: 200
	},
	{
		name: "iphoneXs",
		num: "1",
		price: 12000
	},
	{
		name: "奶粉",
		num: "3",
		price: 40
	},
	{
		name: "笔记本",
		num: "1",
		price: 15000
	}
]

var btn = document.querySelector("#btn");
var clear = document.querySelector("#clear");
var all = document.querySelector("#all");
var tbody = document.querySelector("tbody");
var total = document.querySelector(".total");
var re = 1;

all.disabled = true;
clear.disabled = true;

//创建
btn.onclick = function () {
	btn.disabled = true;
	all.disabled = false;
	clear.disabled = false;
	for(i = 0; i < json.length; i++){
		var tr = document.createElement("tr");
		tbody.appendChild(tr);
		// 商品checkbox
		var tdCheck = document.createElement("td");
		tr.appendChild(tdCheck);
		tdCheck.innerHTML = "<input type='checkbox'>";
		// 商品名称   商品数量   商品价格
		for(key in json[i]){
			var td = document.createElement("td");
			tr.appendChild(td);
			if(key == "num"){
				var htmlStr = '<button class="reduce">-</button>'+
        					  '<input type="text" class="num" value="'+json[i][key]+'" readonly>'+
                              '<button class="add">+</button>'
        		td.innerHTML = htmlStr;
			}else{
				td.innerHTML = json[i][key];
			}
		}
		// 商品总价
		var tdTal = document.createElement("td");
		tr.appendChild(tdTal);
	    // 获取商品单价
	    var tdPrice = tdTal.previousElementSibling.innerText;
	    var tdNum = tdTal.previousElementSibling.previousElementSibling.querySelector('input');
	    tdTal.innerText = tdPrice * tdNum.value;

		// 判断数量是否只有一个
		if(tdNum.value == 1){
			tdNum.previousElementSibling.disabled = true;
		}else{
			tdNum.previousElementSibling.disabled = false;
		}

		// 删除按钮
		var tdDel = document.createElement("td");
		tr.appendChild(tdDel);
		tdDel.innerHTML = "<a href='javascript:void(0);' class='delete'>删除</a>";

		getDel();

		// 数量增加
		var add = document.querySelectorAll(".add");
		// 数量减少
		var reduce = document.querySelectorAll(".reduce");
		for(j = 0; j < add.length; j++){
			add[j].index = j;
			// 数量增加
			add[j].onclick = function (){
				// 该商品的数量
			    var thisNum = this.previousElementSibling.value;
			    thisNum++;
			    this.previousElementSibling.value = thisNum;

			    getToatl();
				// 当商品增加之和，减少按钮可以使用
				reduce[this.index].disabled = false;
			}
			// 数量减少
			reduce[j].onclick = function (){
				// 该商品的数量
			    var thisNum = this.nextElementSibling.value;
			    thisNum--;
			    this.nextElementSibling.value = thisNum;

			    getToatl();
				if(thisNum == "1"){
					this.disabled = true;
				}else{
					this.disabled = false;
				}
			}
		}
		getToatl();
		getAll();
	}
}
// 清除
clear.onclick = function (){
	tbody.innerHTML = "";
	total.innerHTML = 0;
	all.disabled = true;
	all.checked = false;
	btn.disabled = false;
	clear.disabled = true;
}
// 全选
function getAll(){
	var inpntChecks = document.querySelectorAll("tbody input[type='checkbox']");
	all.onclick = function (){
		// 找到all被checked的状态
		var isChecked = all.checked;
		// 遍历所有的checkbox
		for (var g = 0; g < inpntChecks.length; g++) {
			inpntChecks[g].checked = isChecked;
		}
		getToatl();
	}
	// 给inpntChecks所有checkbox添加事件
	for (var t = 0; t < inpntChecks.length; t++) {
		inpntChecks[t].onclick = function () {
			// 总checkbox的个数
			var len1 = inpntChecks.length;
			// 选中的checkbox的个数
			var len2 = document.querySelectorAll("tbody input[type='checkbox']:checked").length;
			if (len1 == len2) {
				all.checked = true;
			} else {
				all.checked = false;
			}
			getToatl();
		}
	}
}
// 删除
function getDel(){
	var del = document.querySelectorAll(".delete");
	for(u = 0; u < del.length; u++){
		del[i].onclick = function(){
			var result = confirm("确认删除商品，该行为不可撤销");
			if(result){
				var current = this.parentNode.parentNode;
				tbody.removeChild(current);
				getAllTotal();
			}
		}
	}
}
// 商品小计
function getToatl(){
    var tds = document.querySelectorAll("tbody tr td:nth-of-type(5)");
    for(var i = 0;i<tds.length; i++){
      var pricem = tds[i].previousElementSibling.innerText-0;
      var numm = tds[i].previousElementSibling.previousElementSibling.querySelector("input").value - 0;
      console.log(pricem,numm)
      tds[i].innerText =  pricem * numm;
    }
	getAllTotal();
}
// 总计
function getAllTotal(){
	var allTotal = document.querySelectorAll("tbody input[type='checkbox']:checked");
	var sums = 0;
	for(u = 0; u < allTotal.length; u++){
		nums = allTotal[u].parentNode.parentNode.querySelector("td:nth-of-type(5)").innerText - 0;
		sums+=nums;
	}
	total.innerHTML = sums;
}