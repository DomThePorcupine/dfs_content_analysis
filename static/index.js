const Table = (props) => {
  const { sentiments } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Sentiment</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(sentiments)
          .sort((a, b) => b[1] - a[1])
          .map(([player, sentiment]) => {
            return (
              <tr key={player}>
                <td>{player}</td>
                <td>{sentiment}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const App = () => {
  const [text, setText] = React.useState();
  const [sentimentData, setSentimentData] = React.useState({});

  const submitForAnalysis = (text) => {
    fetch("/analyze", {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        const sent = Object.values(json["Sentiment"]);
        setSentimentData(
          Object.values(json["Entity"]).reduce((acc, p, i) => {
            acc[p] = sent[i];
            return acc;
          }, {})
        );
      });
  };

  return (
    <div className="centered">
      <h3>Enter the article text to be analyzed:</h3>
      <textarea
        name="Article Text"
        value={text}
        onInput={(ev) => setText(ev.target.value)}
      />
      <button onClick={() => submitForAnalysis(text)}>Submit</button>
      {Object.keys(sentimentData).length > 0 && (
        <Table sentiments={sentimentData} />
      )}
    </div>
  );
};

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);
root.render(<App />);
