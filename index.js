var veer;
var state = { type: 1, height: 20, block: false };
class Start extends React.Component {
  constructor(props) {
    super(props);
    this.methods = this.methods.bind(this);
  }
  methods(meth) {
    show(1);
    types(meth);
    if (meth == 1) {
      block("done");
    } else {
      block();
    }
  }
  render() {
    return (
      <div className="welcome">
        <h3>Welcome to the Game of life</h3>
        <p>
          Click{" "}
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            title="The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine."
          >
            here
          </a>{" "}
          to know about the game and how it works
        </p>
        <h4 title="Hover over the buttons to see what the modes do">
          Which mode do you want to employ?
        </h4>
        <p> Hover over the buttons to see what the modes do</p>
        <div className="choice1">
          <button
            title="This randomises the board and starts the game"
            onClick={() => this.methods(1)}
          >
            Random Mode
          </button>
          <button
            title="This gives you a clear board, where you can click on specific grids and play them when done"
            onClick={() => this.methods(2)}
          >
            Custom Mode
          </button>
        </div>
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.methods = this.methods.bind(this);
    this.detour = this.detour.bind(this);
  }
  methods(num, type) {
    grid(num);
    show(type);
  }
  detour(type) {
    show(type);
  }
  render() {
    return (
      <div className="next">
        <h3>What number of grids do you want to see the game on?</h3>
        <div className="buttons">
          <button onClick={() => this.methods(20, 2)}>20X20</button>
          <button onClick={() => this.methods(30, 2)}>30X30</button>
          <button onClick={() => this.methods(50, 2)}>50X50</button>
          <button
            title="This gives you a free choice to choose your preferred number of grids between 10 to 50 to suit your view."
            onClick={() => this.detour(3)}
          >
            Customise
          </button>
        </div>
        <button onClick={() => show(0)}>Back</button>
      </div>
    );
  }
}

class Detour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.methods = this.methods.bind(this);
    this.change = this.change.bind(this);
    this.warn = this.warn.bind(this);
  }
  methods(e) {
    grid(Number(this.state.value));
    show(2);
  }
  change(e) {
    this.setState({ value: e.target.value });
  }
  warn(e) {
    if (this.state.value > 50 || this.state.value < 10) {
      document.getElementById("warn").style.display = "block";
    } else {
      this.methods(e);
    }
  }
  render() {
    return (
      <div className="next">
        <h3>Input the default grid height</h3>
        <h5>
          Please, note that the height and width will assume the same grid size
        </h5>
        <p id="warn" style={{ display: "none", color: "red" }}>
          The value inputted exceeds 50 grids or is lower than 10 grids
        </p>
        <input
          onChange={this.change}
          placeholder="Max of 50 and Min of 10"
          value={this.state.value}
        />
        <div className="choice1">
          <button onClick={this.warn}>OK</button>
          <button type="reset" onClick={() => show(1)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

var svg;
var board;
function grid(num) {
  state.height = num;
}
function types(meth) {
  state.type = meth;
}
function block(tr) {
  if (tr) {
    state.block = true;
  } else {
    state.block = false;
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: state.height,
      play: true,
      dummy: [],
      gen: 0,
      type: state.type
    };
    grid = grid.bind(this);
    types = types.bind(this);
    this.random_grid = this.random_grid.bind(this);
    this.draw_grid = this.draw_grid.bind(this);
    this.update_grid = this.update_grid.bind(this);
    this.wrap = this.wrap.bind(this);
    this.pa = this.pa.bind(this);
    this.draw_board = this.draw_board.bind(this);
    this.clear = this.clear.bind(this);
    this.start = this.start.bind(this);
  }
  componentDidMount() {
    this.start(state.height);
  }
  componentWillUnmount() {
    clearInterval(veer);
  }
  random_grid(height) {
    var width = height;
    let arr = [];
    let i = 0;
    while (i < height) {
      arr[i] = [];
      i++;
    }
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        arr[i][j] = Math.random() < 0.5 ? 0 : 1;
      }
    }
    return arr;
  }
  update_grid(array) {
    let arr = [...array];
    let height = arr.length;
    let width = arr[0].length;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let k = i > 0 ? i - 1 : height - 1;
        let l = j > 0 ? j - 1 : width - 1;
        let m = i < height - 1 ? i + 1 : 0;
        let n = j < width - 1 ? j + 1 : 0;
        let n_count = [
          i > 0 && j > 0 ? arr[i - 1][j - 1] : 0,
          i > 0 ? arr[i - 1][j] : 0,
          i > 0 && j + 1 < width ? arr[i - 1][j + 1] : 0,
          j > 0 ? arr[i][j - 1] : 0,
          j + 1 < width ? arr[i][j + 1] : 0,
          i + 1 < height && j > 0 ? arr[i + 1][j - 1] : 0,
          i + 1 < height ? arr[i + 1][j] : 0,
          i + 1 < height && j + 1 < width ? arr[i + 1][j + 1] : 0
        ].reduce((a, b) => a + b, 0);
        if (arr[i][j] == 0) {
          arr[i][j] = n_count == 3 ? 1 : 0;
        } else {
          arr[i][j] = n_count == 2 || n_count == 3 ? 1 : 0;
        }
      }
    }
    return arr;
  }
  draw_board(board) {
    let expand = [];
    board.map((i) => {
      i.map((j) => {
        expand.push(j);
      });
    });
    let height = board.length;
    let width = board[0].length;
    svg = d3
      .select(".let")
      .attr("width", 500)
      .attr("height", 500)
      .attr("class", "svg");
    svg
      .selectAll("rect")
      .data(expand)
      .enter()
      .append("rect")
      .attr("x", (d, i) => ((i % width) * 500) / width)
      .attr("y", (d, i) => (Math.floor(i / height) * 500) / height)
      .attr("height", 500 / height)
      .attr("width", 500 / width)
      .attr("class", "cell")
      .on("mousedown", (d, i) => this.pa(i));
  }
  draw_grid(boarde) {
    let ex = [];
    boarde.map((i) => {
      i.map((j) => {
        ex.push(j);
      });
    });
    svg
      .selectAll("rect")
      .attr("fill", (d, i) => (ex[i] == 1 ? "#66bb6a" : "#000"));
  }
  wrap() {
    if (this.state.play == true) {
      veer = setInterval(() => {
        if (this.state.gen == 0) {
          if (this.state.type == 1) {
            var orig = this.random_grid(this.state.height);
            board = this.update_grid(orig);
          } else {
            board = this.update_grid(board);
          }
        } else {
          board = this.update_grid(board);
        }
        this.draw_grid(board);
        this.setState({ gen: this.state.gen + 1 });
      }, 250);
    } else {
      clearInterval(veer);
    }
    this.setState({ play: !this.state.play });
  }
  pa(e) {
    if (!state.block) {
      let height = board.length;
      let width = board[0].length;
      this.setState({ dummy: this.state.dummy.concat(e) });
      let w = e % width;
      let h = Math.floor(e / height);
      board[h][w] = 1;
      this.draw_grid(board);
    }
  }
  clear() {
    let height = board.length;
    let width = board[0].length;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        board[i][j] = 0;
      }
    }
    clearInterval(veer);
    this.draw_grid(board);
    this.setState({ play: true });
    document.getElementById("pop").style.display = "block";
  }
  start(height) {
    var width = height;
    let arr = [];
    let i = 0;
    while (i < height) {
      arr[i] = [];
      i++;
    }
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        arr[i][j] = 0;
      }
    }
    board = arr;
    this.draw_board(this.random_grid(this.state.height));
  }
  render() {
    //console.log(this.state);
    return (
      <div className="draw">
        <div>
          <h3>Generations: {this.state.gen}</h3>
          <button
            className="reset"
            onClick={() => {
              this.clear;
              show(0);
              clearInterval(veer);
              state = { height: 20, type: 1, block: false };
              this.setState({
                gen: 0,
                height: state.height,
                play: true,
                dummy: [],
                type: state.type
              });
            }}
          >
            Reset All
          </button>
        </div>
        <svg className="let" width="500" height="500"></svg>
        <div className="plays">
          <button onClick={this.wrap}>Start/Play/Pause</button>
          <button
            title="Clear your board, once clears it automatically switches to custom mode"
            onClick={this.clear}
          >
            Clear
          </button>
          <button
            id="pop"
            style={{ display: "none" }}
            onClick={() => {
              board = this.random_grid(this.state.height);
              this.draw_grid(board);
              this.setState({ gen: 1 });
            }}
          >
            Randomise
          </button>
        </div>
      </div>
    );
  }
}
function show(num) {
  this.setState({ show: num });
}
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0
    };
    show = show.bind(this);
  }
  render() {
    var shim;
    if (this.state.show == 3) {
      shim = <Detour />;
    } else if (this.state.show == 1) {
      shim = <Grid />;
    } else if (this.state.show == 2) {
      shim = <Game />;
    } else {
      shim = <Start />;
    }
    return <div>{shim}</div>;
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
