import Breadcrumb from "./components/BreadCrumb.js";
import { fetchDirectoryByNodeId, fetchRoot } from "./api.js";
import Nodes from "./components/Nodes.js";

export default function App({ $target }) {
  console.log("App start");
  this.state = {
    nowDirectorys: [],
    beforeDirectorys: [],
    directoryHistory: [{ name: "root", id: "" }],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    nodes.setState({
      nowDirectorys: this.state.nowDirectorys,
      directoryHistory: this.state.directoryHistory,
    });
    breadcrumb.setState(this.state.directoryHistory);
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: {
      directoryHistory: this.state.directoryHistory,
    },
    onClick: async (e) => {
      const selectedId = e.target.dataset.id;
      const history = this.state.directoryHistory;
      console.log("index", history.indexOf(selectedId));
      if (selectedId !== history[history.length - 1].id) {
        const items = await fetchDirectoryByNodeId(selectedId);
        this.setState({
          nowDirectorys: items,
          // directoryHistory: [...history.slice(0, history.indexOf(selectedId))],
        });
      }
    },
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      nowDirectorys: this.state.nowDirectorys,
      directoryHistory: this.state.directoryHistory,
    },
    onClick: async (e) => {
      const { name, id, type } = e.target.closest(".Node").dataset;
      const history = this.state.directoryHistory;

      if (type === "DIRECTORY") {
        const items = await fetchDirectoryByNodeId(id);
        this.setState({
          nowDirectorys: items,
          directoryHistory: [...history, { name: name, id: id }],
        });
      } else if (type === "PREV") {
        const prevId = history[history.length - 2].id;
        const items = prevId
          ? await fetchDirectoryByNodeId(prevId)
          : await fetchRoot();
        this.setState({
          nowDirectorys: items,
          directoryHistory: [...history.slice(0, history.length - 1)],
        });
      } else if (type === "FILE") {
        console.log("modal");
      }
    },
  });

  const onLoad = async () => {
    const root = await fetchRoot();
    console.log(root);
    this.setState({
      nowDirectorys: root,
    });
  };

  window.addEventListener("load", () => {
    console.log("loading success");
    onLoad();
  });
}
