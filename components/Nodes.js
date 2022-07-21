export default function Nodes({ $target, initialState, onClick }) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $target.appendChild(this.$element);

  this.state = initialState.nowDirectorys;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const items = this.state;
    const image_end_point =
      "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";
    this.$element.innerHTML = `
        ${items
          .map(
            (item) => `
        <div class= "Node" data-id=${item.id}> 
         ${
           item.type === "DIRECTORY"
             ? '<img src="./assets/directory.png">'
             : `<img src="${image_end_point}${item.filePath}">`
         }
         <div>${item.name}</div>
        </div>
        `
          )
          .join("")}`;
  };

  this.render();

  this.$element.addEventListener("click", onClick);
}
