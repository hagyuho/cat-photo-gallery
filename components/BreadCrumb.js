export default function BreadCrumble({ $target, initialState }) {
  console.log("BreadCrumble start");
  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  $target.appendChild(this.$element);

  this.state = {
    items: initialState.directoryHistory,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { items } = this.state;
    this.$element.innerHTML = items
      .map(
        (item) =>
          `
        <div>${item}</div>
        `
      )
      .join("");
  };

  this.render();
}
