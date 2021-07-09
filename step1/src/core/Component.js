export default class Component{
    $target;
    $state;
    $props;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.render();
        this.setEvent();
    }
    setup() { };
    mounnted() { };
    template() { return ``; }
    render() {
        this.$target.innerHTML = this.template();
        this.mounnted();
    }
    setEvent() { }
    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorforAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);
        this.$target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) return false;
            callback(event);
        })
    }
}