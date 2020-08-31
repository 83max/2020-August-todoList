new Vue ({
    el: "#app",
    data: {
        todoArrayShow: [],
        lineThrough: {
            textDecoration: "line-through"
        },

        isContentEditable: false,

        yesNoShow: false,
        isGreyOverlay: false,
        isDisabledInput: false,
        isLineThroughShow: false,
        isDisabledCheckbox: false,
        isDisableDeleteBtn: false,
        isEditTodoClass: false,

        clickedMore: false,
        // showLessBtn: false,

        deleteInput: "",
        deleteExactTodo: "",

        isColor: "",

        // idx: "",

        x: "",
        y: "",
        passId: "",

        // htmlString: '<li>  <span><input type="checkbox"></span>  <span class="fa fa-trash-o" aria-hidden="true"></span>  </li>',
    },

    watch: {

        todoArrayShow: {
            handler: function (newValue) {
                localStorage.setItem("todoArrayShow", JSON.stringify(newValue));
            },
            deep: true
        }
    },

    computed: {
        remainingTodos: function () {
            // return this.todoArrayShow.filter(x => !x.show)
            return this.todoArrayShow.filter(function (x) {
                return !x.show;
            })
        },
        completedTodos: function () {
            // return this.todoArrayShow.filter(x => x.show)
            return this.todoArrayShow.filter(function (x) {
                return x.show
            })
        },

        showOnlyFiveCompletedTodosBtn(){
            return this.completedTodos.length > 5;
        },

        hideTodos(){
            return this.completedTodos.slice(0, 5);
        },

        percentageCalcColor() {
            if (Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100) === 100) {
                return Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100);
            } if (Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100) >= 50) {
                return Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100);
            } if (Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100) < 50) {
                return Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100);
            } if (Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100) === 0) {
                return Math.round(this.completedTodos.length / (this.remainingTodos.length + this.completedTodos.length) * 100);
            }
        }

        // showLessThanSixCompletedTodosBtn(){
        //     return this.completedTodos.length >= 6;
        // }

    },

    methods: {
        addTodo() {

            this.todoArrayShow.push({
                id: Math.round(Math.random() * 100000, 0),
                text: this.$refs.inputRef.value,
                show: false
            });

            this.$refs.inputRef.value = "";
            
            localStorage.setItem("todoArrayShow", JSON.stringify(this.todoArrayShow));
		
	    const myUrl = new URL ("https://2020-august-todo-list.vercel.app/");
	    const myURLhash = myUrl.hash = Math.round(Math.random() * 100000000000000000000);
	    window.location = myUrl + myURLhash;
        },

        deleteTodo(id) {
            this.isDisableDeleteBtn = true;
            this.isDisabledCheckbox = true;
            this.isLineThroughShow = true;
            this.isDisabledInput = true;
            this.isGreyOverlay = true;
            this.yesNoShow = true;
            this.deleteInput = this.todoArrayShow.find(i => i.id === id).text;
            this.deleteExactTodo = id;
            // this.todoArrayShow = this.todoArrayShow.filter(item => this.todoArrayShow[index].text !== item.text)
        },

        noBtn() {
            this.isDisableDeleteBtn = false;
            this.isDisabledCheckbox = false;
            this.isLineThroughShow = false;
            this.isDisabledInput = false;
            this.isGreyOverlay = false;
            this.yesNoShow = false;
        },

        yesBtn() {
            this.todoArrayShow = this.todoArrayShow.filter((item) => item.id !== this.deleteExactTodo);

            localStorage.setItem("todoArrayShow", JSON.stringify(this.todoArrayShow));

            this.isDisableDeleteBtn = false;
            this.isDisabledCheckbox = false;
            this.isLineThroughShow = false;
            this.isDisabledInput = false;
            this.isGreyOverlay = false;
            this.yesNoShow = false;
        },

        editTodoDblClick(id) {
            this.isContentEditable = true;
            this.passId = id;
        },

        editTextInLi(e){
            this.x = e.target.textContent;

            this.y = e.target

            const findId = this.todoArrayShow.find((id) => id.id == this.passId);

            findId.text = this.x

            localStorage.setItem("todoArrayShow", JSON.stringify(this.todoArrayShow));

            this.isContentEditable = false;
        },

        showMoreThanFiveTodos() {
            this.clickedMore = true;
            // this.showLessBtn = true;
        },

        // showLessFunction(){
        //     this.clickedMore = false;
        //     this.showLessBtn = false;
        // }

    },

    created(){
        const localStorageItems = JSON.parse(localStorage.getItem("todoArrayShow"));

        if (localStorageItems) {
            this.todoArrayShow = localStorageItems;

        }

        localStorage.setItem("todoArrayShow", JSON.stringify(this.todoArrayShow));

    }

})
