export class Component {
    $target;
    $state;

    constructor($target) {
        this.$target = $target;
        this.init();
        this.render();
    }

    init() {}
    template() {}
    render() {
        this.$target.innerHTML = this.template();
        this.setBtnHandler();
    }
    setState(newState) {
        this.$state = { ...newState };
        this.render();
    }
    setBtnHandler() {}
}
