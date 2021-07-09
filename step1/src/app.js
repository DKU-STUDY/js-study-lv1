import ItemAppender from "../components/ItemAppender";
import Items from "../components/Items";
import ItemModifier from "../components/ItemModifier";
import Component from "../core/Component";




export default class App extends Component{
  
    setup() {
        this.$state = {
            todoItems: [
                {
                    id: 1,
                    content: `item1`,
                    isComplete: false,
                },
                {
                    id: 2,
                    content: `item2`,
                    isComplete: false,
                }
            ],
            selectedItem:-1
        }
    }
    template() {
        return `
        <h1>📃 TodoList</h1>
        <form data-component="appenderForm" action="" method="post"></form>
        <ul>
        <li data-component="modifierForm"></li>
        <li data-component="items></li>
        </ul>
        `;
    }
    






    mounted(){
        const { addItem, deleteItem, toggleItem, resetItem, updateItem, editItem } = this;
        const $appenderForm = this.$target.querySelector(`[data-component="appenderForm"]`);
        const $modifierForm = this.$target.querySelector(`[data-coponent="modifierForm"]`);
        const $items = this.$target.querySelector(`[data-component="items"]`);

        new ItemAppender($appenderForm, {
            addItem: addItem.bind(this)
        });

        new Items($items, {
            deleteItem: deleteItem.bind(this),
            editItem: editItem.bind(this);
            toggleItem: toggleItem.bind(this)
        });
        new ItemModifier($modifierForm, {
            resetItem: resetItem.bind(this),
            updatItem: updateItem.bind(this),
        });

    addItem(contents){
        const { todoItems } = this.$state;
        const id = Math.max(0, ...todoItems.map(item => item.id) + 1);
        const isComplete = false;
        this.setState({
            todoItems: [
                ...todoItems, { id, contents, isComplete }
                ]
            });
        }
    }

    deleteItem(id) {
        const todoItems = [...this.$state.todoItems];
        todoItems.splice(todoItems.findIndex(item => item.id === id), 1);
        this.setState({ todoItems });
    }

    toggleItem(id) {
        const todoItems = [...this.$state.todoItems];
        const key = todoItems.findIndex(item => item.id === id);
        todoItems[key].isComplete = !todoItems[key].isComplete;
        this.setState({ todoItems });
    }
    editItem(id) {
        const { todoItems, selectedItem } = this.$state;       
        selectedItem = id;
        this.setState({ selectedItem });
    }
    updatItem(contents) {
        const todoItems = [...this.$state.todoItems];
        const selectedItem = this.$state.selectedItem;
        todoItems[selectedItem].content = contents;
        selectedItem = -1;
        this.setState({ todoItems, selectedItem });
    }
    resetItem() {
        const selectedItem = this.$state.selectedItem;
        selectedItem = -1;
        this.setState({ selectedItem });
    }


