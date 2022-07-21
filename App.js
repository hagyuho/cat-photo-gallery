import Breadcrumb from "./components/BreadCrumb.js";
import { fetchDirectoryByNodeId, fetchRoot } from "./api.js";
import Nodes from "./components/Nodes.js";

export default function App({ $target }) {
  console.log("App start");
  this.state = {
    nowDirectorys: [],
    beforeDirectorys: [],
    directoryHistory: ["root"],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    nodes.setState(this.state.nowDirectorys);
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: {
      directoryHistory: this.state.directoryHistory,
    },
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      nowDirectorys: this.state.nowDirectorys,
    },
    onClick: async (e) => {
      console.log(e.target.dataset.id);
      const items = await fetchDirectoryByNodeId(e.target.dataset.id);
      console.log("fetchDirectoryByNodeId", items);
      this.setState({ nowDirectorys: items });
    },
  });

  const onLoad = async () => {
    const root = await fetchRoot();
    this.setState({
      nowDirectorys: root,
    });
  };

  window.addEventListener("load", () => {
    console.log("loading success");
    onLoad();
  });
}
