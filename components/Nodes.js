const IMAGE_END_POINT =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function Nodes({ $target, initialState, onClick }) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $target.appendChild(this.$element);

  this.state = {
    nowDirectorys: initialState.nowDirectorys,
    directoryHistory: initialState.directoryHistory,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { nowDirectorys, directoryHistory } = this.state;

    this.$element.innerHTML = `
          ${
            directoryHistory.length > 1
              ? `
          <div class="Node" data-type="PREV">
          <img src="./assets/prev.png">
        </div>
        `
              : ""
          }
          ${nowDirectorys
            .map(
              (item) => `
          <div class= "Node" data-id=${item.id} data-type=${
                item.type
              } data-name=${item.name}> 
           ${
             item.type === "DIRECTORY"
               ? '<img src="./assets/directory.png">'
               : `<img src="${IMAGE_END_POINT}${item.filePath}">`
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
